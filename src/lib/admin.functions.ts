import { createServerFn } from "@tanstack/react-start";
import * as z from "zod";

import { adminAuthMiddleware } from "@/lib/admin-middleware";
import { getServiceClient, REGISTRATION_BUCKET } from "@/lib/supabase/server";

const PAGE_SIZE = 20;
const SIGNED_URL_TTL_SECONDS = 600;

type RegistrationRow = {
  id: string;
  created_at: string;
  full_name: string;
  gender: string;
  phone: string;
  age: number;
  lga_code: string;
  lga_name: string;
  ward_code: string;
  ward_name: string;
  polling_unit_code: string;
  polling_unit_name: string;
  voters_card_number: string;
  occupation: string;
  other_occupation: string | null;
  passport_path: string;
  voters_card_path: string;
};

const LIST_COLUMNS =
  "id, created_at, full_name, phone, lga_name, ward_name, polling_unit_name, occupation, passport_path";

function toRegistration(row: RegistrationRow) {
  return {
    id: row.id,
    createdAt: row.created_at,
    fullName: row.full_name,
    gender: row.gender,
    phone: row.phone,
    age: row.age,
    lga: { code: row.lga_code, name: row.lga_name },
    ward: { code: row.ward_code, name: row.ward_name },
    pollingUnit: { code: row.polling_unit_code, name: row.polling_unit_name },
    votersCardNumber: row.voters_card_number,
    occupation: row.occupation,
    otherOccupation: row.other_occupation,
  };
}

export const checkAdminAccess = createServerFn({ method: "GET" })
  .middleware([adminAuthMiddleware])
  .handler(async () => ({ isAdmin: true as const }));

const listInput = z.object({
  page: z.coerce.number().int().min(1).max(10_000).default(1),
  search: z.string().max(100).default(""),
});

export const listRegistrations = createServerFn({ method: "GET" })
  .middleware([adminAuthMiddleware])
  .validator((input: unknown) => listInput.parse(input ?? {}))
  .handler(async ({ data }) => {
    const db = getServiceClient();
    const from = (data.page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    // Keep only safe characters so the value cannot break out of the PostgREST filter.
    const term = data.search.replace(/[^\p{L}\p{N}\s.-]/gu, "").trim();

    let query = db
      .from("registrations")
      .select(LIST_COLUMNS, { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (term) {
      const pattern = `%${term}%`;
      query = query.or(
        `full_name.ilike.${pattern},phone.ilike.${pattern},voters_card_number.ilike.${pattern}`,
      );
    }

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const [listResult, totalResult, recentResult] = await Promise.all([
      query,
      db.from("registrations").select("id", { count: "exact", head: true }),
      db
        .from("registrations")
        .select("id", { count: "exact", head: true })
        .gte("created_at", sevenDaysAgo),
    ]);

    if (listResult.error || totalResult.error || recentResult.error) {
      console.error("admin list failed", listResult.error ?? totalResult.error ?? recentResult.error);
      throw new Error("Could not load registrations");
    }

    const rows = (listResult.data ?? []) as unknown as (RegistrationRow & {
      passport_path: string;
    })[];

    const passportUrls = new Map<string, string>();
    if (rows.length > 0) {
      const { data: signed } = await db.storage
        .from(REGISTRATION_BUCKET)
        .createSignedUrls(
          rows.map((r) => r.passport_path),
          SIGNED_URL_TTL_SECONDS,
        );
      for (const entry of signed ?? []) {
        if (entry.path && entry.signedUrl) passportUrls.set(entry.path, entry.signedUrl);
      }
    }

    return {
      rows: rows.map((row) => ({
        id: row.id,
        createdAt: row.created_at,
        fullName: row.full_name,
        phone: row.phone,
        lgaName: row.lga_name,
        wardName: row.ward_name,
        pollingUnitName: row.polling_unit_name,
        occupation: row.occupation,
        passportUrl: passportUrls.get(row.passport_path) ?? null,
      })),
      total: listResult.count ?? 0,
      page: data.page,
      pageSize: PAGE_SIZE,
      stats: {
        total: totalResult.count ?? 0,
        last7Days: recentResult.count ?? 0,
      },
    };
  });

export const getRegistration = createServerFn({ method: "GET" })
  .middleware([adminAuthMiddleware])
  .validator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const db = getServiceClient();

    const { data: row, error } = await db
      .from("registrations")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) {
      console.error("admin detail failed", error);
      throw new Error("Could not load registration");
    }
    if (!row) {
      throw new Error("Registration not found");
    }

    const registration = row as unknown as RegistrationRow;
    const bucket = db.storage.from(REGISTRATION_BUCKET);
    const [passport, votersCard] = await Promise.all([
      bucket.createSignedUrl(registration.passport_path, SIGNED_URL_TTL_SECONDS),
      bucket.createSignedUrl(registration.voters_card_path, SIGNED_URL_TTL_SECONDS),
    ]);

    return {
      ...toRegistration(registration),
      passportUrl: passport.data?.signedUrl ?? null,
      votersCardUrl: votersCard.data?.signedUrl ?? null,
      urlsExpireInSeconds: SIGNED_URL_TTL_SECONDS,
    };
  });
