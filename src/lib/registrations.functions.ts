import { createServerFn } from "@tanstack/react-start";

import locationData from "@/data/nasarawa-locations.json";
import { registrationFormSchema } from "@/lib/registration";
import { getServiceClient, REGISTRATION_BUCKET } from "@/lib/supabase/server";

type ImageKind = { ext: string; contentType: string };

// Checks the file's real signature bytes. The browser-declared MIME type is not trusted.
async function detectImage(file: File): Promise<ImageKind | null> {
  const head = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const startsWith = (sig: number[], offset = 0) =>
    sig.every((byte, i) => head[offset + i] === byte);

  if (startsWith([0xff, 0xd8, 0xff])) return { ext: "jpg", contentType: "image/jpeg" };
  if (startsWith([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
    return { ext: "png", contentType: "image/png" };
  if (startsWith([0x52, 0x49, 0x46, 0x46]) && startsWith([0x57, 0x45, 0x42, 0x50], 8))
    return { ext: "webp", contentType: "image/webp" };
  return null;
}

function resolveLocation(lgaCode: string, wardCode: string, pollingUnitCode: string) {
  const lga = locationData.lgas.find((l) => l.code === lgaCode);
  const ward = lga?.wards.find((w) => w.code === wardCode);
  const pollingUnit = ward?.pollingUnits.find((p) => p.full_code === pollingUnitCode);
  if (!lga || !ward || !pollingUnit) return null;
  return { lga, ward, pollingUnit };
}

export const submitRegistration = createServerFn({ method: "POST" })
  .validator((data: FormData) => data)
  .handler(async ({ data }) => {
    const text = (key: string) => {
      const value = data.get(key);
      return typeof value === "string" ? value : "";
    };

    const parsed = registrationFormSchema.safeParse({
      fullname: text("fullname"),
      gender: text("gender"),
      phone: text("phone"),
      age: text("age"),
      lga: text("lga"),
      ward: text("ward"),
      pollingUnit: text("pollingUnit"),
      votersCardNumber: text("votersCardNumber"),
      occupation: text("occupation"),
      otherOccupation: text("otherOccupation"),
      votersCardFile: data.get("votersCardFile"),
      pictureFile: data.get("pictureFile"),
    });
    if (!parsed.success) {
      throw new Error(parsed.error.issues[0]?.message ?? "Invalid submission");
    }
    const values = parsed.data;

    const location = resolveLocation(values.lga, values.ward, values.pollingUnit);
    if (!location) {
      throw new Error("Invalid LGA, ward or polling unit");
    }

    const passport = await detectImage(values.pictureFile);
    const votersCard = await detectImage(values.votersCardFile);
    if (!passport || !votersCard) {
      throw new Error("Uploaded files must be real JPG, PNG or WebP images");
    }

    const id = crypto.randomUUID();
    const passportPath = `${id}/passport.${passport.ext}`;
    const votersCardPath = `${id}/voters-card.${votersCard.ext}`;

    const db = getServiceClient();
    const bucket = db.storage.from(REGISTRATION_BUCKET);

    const passportUpload = await bucket.upload(passportPath, values.pictureFile, {
      contentType: passport.contentType,
      upsert: false,
    });
    if (passportUpload.error) {
      console.error("passport upload failed", passportUpload.error);
      throw new Error("Could not upload your passport picture. Please try again.");
    }

    const votersCardUpload = await bucket.upload(votersCardPath, values.votersCardFile, {
      contentType: votersCard.contentType,
      upsert: false,
    });
    if (votersCardUpload.error) {
      await bucket.remove([passportPath]);
      console.error("voters card upload failed", votersCardUpload.error);
      throw new Error("Could not upload your Voter's Card image. Please try again.");
    }

    const { error } = await db.from("registrations").insert({
      id,
      full_name: values.fullname.trim(),
      gender: values.gender,
      phone: values.phone,
      age: values.age,
      lga_code: location.lga.code,
      lga_name: location.lga.name,
      ward_code: location.ward.code,
      ward_name: location.ward.name,
      polling_unit_code: location.pollingUnit.full_code,
      polling_unit_name: location.pollingUnit.name,
      voters_card_number: values.votersCardNumber,
      occupation: values.occupation,
      other_occupation:
        values.occupation === "Other" ? values.otherOccupation?.trim() ?? null : null,
      passport_path: passportPath,
      voters_card_path: votersCardPath,
    });

    if (error) {
      await bucket.remove([passportPath, votersCardPath]);
      if (error.code === "23505") {
        throw new Error("A registration with this Voter's Card Number already exists.");
      }
      console.error("registration insert failed", error);
      throw new Error("Could not save your registration. Please try again.");
    }

    return { success: true as const };
  });
