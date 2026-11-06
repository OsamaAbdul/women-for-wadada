import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRegistration } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/registrations/$id")({
  component: RegistrationDetail,
});

function RegistrationDetail() {
  const { id } = Route.useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "registration", id],
    queryFn: () => getRegistration({ data: { id } }),
  });

  return (
    <div className="space-y-8">
      <Link
        to="/admin"
        className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-brand"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to registrations
      </Link>

      {isLoading && <p className="text-muted-foreground">Loading...</p>}
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error instanceof Error ? error.message : "Could not load this registration."}
        </p>
      )}

      {data && (
        <>
          <div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground">
              {data.fullName}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Submitted {format(new Date(data.createdAt), "dd MMM yyyy, HH:mm")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Details</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                  <Detail label="Full name" value={data.fullName} />
                  <Detail label="Gender" value={data.gender} />
                  <Detail label="Phone" value={data.phone} />
                  <Detail label="Age" value={String(data.age)} />
                  <Detail label="LGA" value={data.lga.name} />
                  <Detail label="Ward" value={data.ward.name} />
                  <Detail label="Polling unit" value={data.pollingUnit.name} />
                  <Detail label="Polling unit code" value={data.pollingUnit.code} />
                  <Detail label="Voter's Card (VIN)" value={data.votersCardNumber} />
                  <Detail
                    label="Occupation"
                    value={
                      data.occupation === "Other" && data.otherOccupation
                        ? `Other: ${data.otherOccupation}`
                        : data.occupation
                    }
                  />
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Uploaded images</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ImagePanel label="Passport picture" url={data.passportUrl} />
                <ImagePanel label="Voter's Card image" url={data.votersCardUrl} />
                <p className="text-xs text-muted-foreground">
                  Image links are private and expire after{" "}
                  {Math.round(data.urlsExpireInSeconds / 60)} minutes. Reload the page to refresh them.
                </p>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 break-words text-sm text-foreground">{value}</dd>
    </div>
  );
}

function ImagePanel({ label, url }: { label: string; url: string | null }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-foreground">{label}</p>
      {url ? (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <img
            src={url}
            alt={label}
            className="max-h-96 w-full rounded-lg border border-border bg-muted object-contain"
          />
        </a>
      ) : (
        <p className="text-sm text-muted-foreground">Image unavailable.</p>
      )}
    </div>
  );
}
