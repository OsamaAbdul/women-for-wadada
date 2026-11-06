import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { listRegistrations } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "registrations", page, search],
    queryFn: () => listRegistrations({ data: { page, search } }),
    placeholderData: keepPreviousData,
  });

  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1;

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground">
          Registrations
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          All membership submissions. Open a record to view its passport and Voter's Card images.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total registrations</CardDescription>
            <CardTitle className="text-3xl">{data?.stats.total ?? "—"}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Last 7 days</CardDescription>
            <CardTitle className="text-3xl">{data?.stats.last7Days ?? "—"}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Search by name, phone or Voter's Card number"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="sm:max-w-md"
        />
        <Button type="submit" variant="outline">
          Search
        </Button>
        {search && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setSearchInput("");
              setSearch("");
              setPage(1);
            }}
          >
            Clear
          </Button>
        )}
      </form>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error instanceof Error ? error.message : "Could not load registrations."}
        </p>
      )}

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Passport</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>LGA / Ward</TableHead>
              <TableHead>Polling Unit</TableHead>
              <TableHead>Occupation</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead className="text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={8} className="py-10 text-center text-muted-foreground">
                  Loading...
                </TableCell>
              </TableRow>
            )}
            {!isLoading && data?.rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="py-10 text-center text-muted-foreground">
                  No registrations found.
                </TableCell>
              </TableRow>
            )}
            {data?.rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  {row.passportUrl ? (
                    <img
                      src={row.passportUrl}
                      alt={`Passport of ${row.fullName}`}
                      loading="lazy"
                      className="h-12 w-12 rounded-md border border-border object-cover"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-md bg-muted" />
                  )}
                </TableCell>
                <TableCell className="font-medium">{row.fullName}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>
                  <div>{row.lgaName}</div>
                  <div className="text-xs text-muted-foreground">{row.wardName}</div>
                </TableCell>
                <TableCell className="max-w-[220px] truncate">{row.pollingUnitName}</TableCell>
                <TableCell>{row.occupation}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {format(new Date(row.createdAt), "dd MMM yyyy, HH:mm")}
                </TableCell>
                <TableCell className="text-right">
                  <Link
                    to="/admin/registrations/$id"
                    params={{ id: row.id }}
                    className="text-sm font-semibold text-brand hover:underline"
                  >
                    View
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {data && data.total > data.pageSize && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {page} of {totalPages} · {data.total} results
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
