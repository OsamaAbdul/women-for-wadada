import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Copy,
  ExternalLink,
  Eye,
  Filter,
  MapPin,
  MoreHorizontal,
  Phone,
  Search,
  Sparkles,
  Users,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import locationData from "@/data/nasarawa-locations.json";
import { getRegistration, listRegistrations } from "@/lib/admin.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

const LGA_OPTIONS = [...locationData.lgas].sort((a, b) => a.name.localeCompare(b.name));

function AdminDashboard() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [lga, setLga] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const lgaFilter = lga === "all" ? "" : lga;

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["admin", "registrations", page, search, lgaFilter],
    queryFn: () => listRegistrations({ data: { page, search, lga: lgaFilter } }),
    placeholderData: keepPreviousData,
  });

  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1;
  const hasActiveFilters = Boolean(search || lgaFilter);

  const activeLgaName = useMemo(
    () => LGA_OPTIONS.find((item) => item.code === lgaFilter)?.name,
    [lgaFilter],
  );

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  }

  function clearFilters() {
    setSearchInput("");
    setSearch("");
    setLga("all");
    setPage(1);
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-emerald-500/[0.08] via-background to-teal-500/[0.06] p-6 shadow-sm sm:p-8"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-background/70 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm backdrop-blur dark:text-emerald-300">
              <Sparkles className="h-3.5 w-3.5" />
              Live registrations overview
            </div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Admin Dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Monitor submissions, filter by local government, and open any record in a rich detail
              modal to review passport and voter&apos;s card information instantly.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <span
              className={cn(
                "inline-flex h-2.5 w-2.5 rounded-full",
                isFetching ? "animate-pulse bg-amber-500" : "bg-emerald-500",
              )}
            />
            {isFetching ? "Refreshing data..." : "Up to date"}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        <StatCard
          label="Total registrations"
          value={data?.stats.total}
          icon={Users}
          accent="from-emerald-500 to-teal-600"
          hint="All-time submissions"
        />
        <StatCard
          label="Last 7 days"
          value={data?.stats.last7Days}
          icon={CalendarDays}
          accent="from-sky-500 to-indigo-600"
          hint="Recent activity"
        />
        <StatCard
          label="Showing now"
          value={data?.total}
          icon={Filter}
          accent="from-amber-500 to-orange-600"
          hint={hasActiveFilters ? "Matching current filters" : "All records"}
        />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Card className="overflow-hidden rounded-3xl border-border/60 bg-card/80 shadow-sm backdrop-blur-sm">
          <CardContent className="space-y-4 p-4 sm:p-6">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <form onSubmit={handleSearch} className="flex w-full flex-col gap-3 sm:flex-row lg:max-w-3xl">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, phone or voter's card number"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="h-11 rounded-xl border-border/70 bg-background/70 pl-9 shadow-sm transition-shadow focus-visible:shadow-md"
                  />
                </div>
                <Select
                  value={lga}
                  onValueChange={(value) => {
                    setLga(value);
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="h-11 w-full rounded-xl border-border/70 bg-background/70 shadow-sm sm:w-[240px]">
                    <div className="flex items-center gap-2 truncate">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="All LGAs" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Local Governments</SelectItem>
                    {LGA_OPTIONS.map((item) => (
                      <SelectItem key={item.code} value={item.code}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="submit"
                  className="h-11 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 font-semibold text-white shadow-md shadow-emerald-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-emerald-500 hover:to-teal-500 hover:shadow-lg hover:shadow-emerald-600/25"
                >
                  Apply
                </Button>
              </form>

              {hasActiveFilters && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={clearFilters}
                  className="h-11 rounded-xl px-4 text-muted-foreground hover:bg-muted/70"
                >
                  <X className="mr-1.5 h-4 w-4" />
                  Clear filters
                </Button>
              )}
            </div>

            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Active filters:
                </span>
                {search && (
                  <Badge variant="secondary" className="rounded-full px-3 py-1">
                    Search: {search}
                  </Badge>
                )}
                {activeLgaName && (
                  <Badge variant="secondary" className="rounded-full px-3 py-1">
                    LGA: {activeLgaName}
                  </Badge>
                )}
              </div>
            )}

            {error && (
              <p
                role="alert"
                className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive"
              >
                {error instanceof Error ? error.message : "Could not load registrations."}
              </p>
            )}

            <div className="rounded-2xl border border-border/60 bg-background/40 p-3 sm:p-4">
              {isLoading && (
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={`skeleton-${i}`}
                      className="rounded-2xl border border-border/60 bg-card/60 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <Skeleton className="h-14 w-14 rounded-2xl" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-36" />
                          <Skeleton className="h-3 w-24" />
                          <Skeleton className="h-3 w-40" />
                        </div>
                        <Skeleton className="h-9 w-9 rounded-full" />
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <Skeleton className="h-10 rounded-xl" />
                        <Skeleton className="h-10 rounded-xl" />
                        <Skeleton className="h-10 rounded-xl col-span-2" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!isLoading && data?.rows.length === 0 && (
                <div className="py-14 text-center">
                  <div className="mx-auto flex max-w-sm flex-col items-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
                      <Users className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <p className="font-medium text-foreground">No registrations found</p>
                    <p className="text-sm text-muted-foreground">
                      Try adjusting your search or local government filter.
                    </p>
                  </div>
                </div>
              )}

              {!isLoading && !!data?.rows.length && (
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 2xl:grid-cols-3">
                  {data.rows.map((row, index) => (
                    <motion.article
                      key={row.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, delay: Math.min(index * 0.03, 0.25) }}
                      whileHover={{ y: -3 }}
                      className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/5"
                    >
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500/70 via-teal-500/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      <div className="flex items-start gap-3">
                        {row.passportUrl ? (
                          <img
                            src={row.passportUrl}
                            alt={`Passport of ${row.fullName}`}
                            loading="lazy"
                            className="h-14 w-14 shrink-0 rounded-2xl border border-border/60 object-cover shadow-sm ring-2 ring-transparent transition-all duration-300 group-hover:scale-[1.03] group-hover:ring-emerald-500/20"
                          />
                        ) : (
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/15 to-teal-500/15 text-base font-bold text-emerald-700 dark:text-emerald-300">
                            {row.fullName.slice(0, 1).toUpperCase()}
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <h3 className="truncate text-base font-semibold leading-tight text-foreground">
                                {row.fullName}
                              </h3>
                              <div className="mt-1 flex flex-wrap items-center gap-1.5">
                                <Badge
                                  variant="outline"
                                  className="max-w-full truncate rounded-full border-border/70 bg-background/60 font-medium"
                                >
                                  {row.occupation}
                                </Badge>
                              </div>
                            </div>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-9 w-9 shrink-0 rounded-full border border-transparent text-muted-foreground transition-all hover:border-border/70 hover:bg-muted/70 hover:text-foreground data-[state=open]:bg-muted/70 data-[state=open]:text-foreground"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open actions for {row.fullName}</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-52 rounded-xl p-1.5">
                                <DropdownMenuLabel className="truncate text-xs text-muted-foreground">
                                  {row.fullName}
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onSelect={() => setSelectedId(row.id)}
                                  className="cursor-pointer rounded-lg"
                                >
                                  <Eye className="h-4 w-4" />
                                  View full details
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild className="cursor-pointer rounded-lg">
                                  <Link to="/admin/registrations/$id" params={{ id: row.id }}>
                                    <ExternalLink className="h-4 w-4" />
                                    Open detail page
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onSelect={async () => {
                                    try {
                                      await navigator.clipboard.writeText(row.phone);
                                    } catch {
                                      // ignore clipboard errors in restricted contexts
                                    }
                                  }}
                                  className="cursor-pointer rounded-lg"
                                >
                                  <Copy className="h-4 w-4" />
                                  Copy phone number
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                        <InfoPill icon={Phone} label="Phone" value={row.phone} />
                        <InfoPill
                          icon={CalendarDays}
                          label="Submitted"
                          value={format(new Date(row.createdAt), "dd MMM yyyy, HH:mm")}
                        />
                        <InfoPill
                          icon={MapPin}
                          label="LGA / Ward"
                          value={`${row.lgaName} · ${row.wardName}`}
                          className="sm:col-span-2"
                        />
                        <InfoPill
                          icon={Briefcase}
                          label="Polling unit"
                          value={row.pollingUnitName}
                          className="sm:col-span-2"
                        />
                      </div>

                      <div className="mt-4 flex">
                        <Button
                          variant="outline"
                          onClick={() => setSelectedId(row.id)}
                          className="h-10 w-full rounded-xl border-border/70 bg-background/70 font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:text-emerald-700 hover:shadow-md dark:hover:text-emerald-300"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Quick view
                        </Button>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
            </div>

            {data && data.total > 0 && (
              <div className="flex flex-col items-center justify-between gap-3 pt-1 sm:flex-row">
                <p className="text-sm text-muted-foreground">
                  Page <span className="font-semibold text-foreground">{page}</span> of{" "}
                  <span className="font-semibold text-foreground">{totalPages}</span> ·{" "}
                  <span className="font-semibold text-foreground">{data.total}</span> result
                  {data.total === 1 ? "" : "s"}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="rounded-full px-4 transition-all hover:-translate-y-0.5 disabled:hover:translate-y-0"
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="rounded-full px-4 transition-all hover:-translate-y-0.5 disabled:hover:translate-y-0"
                  >
                    Next
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.section>

      <RegistrationDetailDialog
        id={selectedId}
        open={selectedId !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null);
        }}
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
  hint,
}: {
  label: string;
  value: number | undefined;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  hint: string;
}) {
  return (
    <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ type: "spring", stiffness: 320, damping: 22 }}>
      <Card className="group relative overflow-hidden rounded-3xl border-border/60 bg-card/80 shadow-sm backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-black/5">
        <div className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-90", accent)} />
        <CardContent className="flex items-start justify-between gap-4 p-5 sm:p-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <div className="mt-2 flex items-baseline gap-2">
              {value === undefined ? (
                <Skeleton className="h-9 w-20" />
              ) : (
                <p className="font-display text-3xl font-extrabold tracking-tight text-foreground">
                  {value.toLocaleString()}
                </p>
              )}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{hint}</p>
          </div>
          <div
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
              accent,
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function RegistrationDetailDialog({
  id,
  open,
  onOpenChange,
}: {
  id: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "registration", id],
    queryFn: () => getRegistration({ data: { id: id! } }),
    enabled: open && !!id,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-hidden rounded-3xl border-border/60 p-0 sm:max-w-4xl">
        <div className="relative max-h-[92vh] overflow-y-auto">
          <div className="sticky top-0 z-20 border-b border-border/60 bg-background/90 px-6 py-5 backdrop-blur-xl sm:px-8">
            <div className="flex items-start justify-between gap-4">
              <DialogHeader className="min-w-0 flex-1 space-y-1 pr-2 text-left">
                <DialogTitle className="flex flex-wrap items-center gap-2 font-display text-2xl font-extrabold tracking-tight">
                  {data?.fullName || (isLoading ? "Loading registration..." : "Registration details")}
                  {data && (
                    <Badge className="rounded-full bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/10 dark:text-emerald-300">
                      Verified record
                    </Badge>
                  )}
                </DialogTitle>
                <DialogDescription>
                  {data
                    ? `Submitted ${format(new Date(data.createdAt), "dd MMMM yyyy, HH:mm")}`
                    : "Full registrant profile and uploaded documents."}
                </DialogDescription>
              </DialogHeader>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 shrink-0 rounded-full border-border/70 bg-background/80 shadow-sm transition-all hover:bg-muted"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </DialogClose>
            </div>
          </div>

          <div className="space-y-6 px-6 py-6 sm:px-8 sm:py-7">
            {isLoading && (
              <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-4 rounded-2xl border border-border/60 p-5">
                  <Skeleton className="h-5 w-32" />
                  <div className="grid grid-cols-2 gap-4">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4 rounded-2xl border border-border/60 p-5">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-48 w-full rounded-xl" />
                  <Skeleton className="h-48 w-full rounded-xl" />
                </div>
              </div>
            )}

            {error && (
              <p role="alert" className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                {error instanceof Error ? error.message : "Could not load this registration."}
              </p>
            )}

            {data && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
              >
                <div className="space-y-5">
                  <section className="rounded-2xl border border-border/60 bg-card/50 p-5 shadow-sm sm:p-6">
                    <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      <Users className="h-4 w-4" />
                      Personal &amp; location details
                    </h3>
                    <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                      <Detail label="Full name" value={data.fullName} />
                      <Detail label="Gender" value={data.gender} />
                      <Detail label="Phone" value={data.phone} />
                      <Detail label="Age" value={String(data.age)} />
                      <Detail label="Local Government Area" value={data.lga.name} />
                      <Detail label="Ward" value={data.ward.name} />
                      <Detail label="Polling unit" value={data.pollingUnit.name} className="sm:col-span-2" />
                      <Detail label="Polling unit code" value={data.pollingUnit.code} />
                      <Detail label="Voter's Card (VIN)" value={data.votersCardNumber} />
                      <Detail
                        label="Occupation"
                        value={
                          data.occupation === "Other" && data.otherOccupation
                            ? `Other: ${data.otherOccupation}`
                            : data.occupation
                        }
                        className="sm:col-span-2"
                      />
                    </dl>
                  </section>

                  <section className="rounded-2xl border border-emerald-500/15 bg-gradient-to-br from-emerald-500/[0.06] to-transparent p-5 sm:p-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                      Record metadata
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge variant="secondary" className="rounded-full">
                        ID: {data.pollingUnit.code}
                      </Badge>
                      <Badge variant="secondary" className="rounded-full">
                        {data.lga.name}
                      </Badge>
                      <Badge variant="secondary" className="rounded-full">
                        {format(new Date(data.createdAt), "dd MMM yyyy, HH:mm")}
                      </Badge>
                    </div>
                  </section>
                </div>

                <section className="space-y-4 rounded-2xl border border-border/60 bg-card/50 p-5 shadow-sm sm:p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Uploaded documents
                  </h3>
                  <ImagePanel label="Passport photograph" url={data.passportUrl} />
                  <ImagePanel label="Voter's card image" url={data.votersCardUrl} />
                  <p className="rounded-xl bg-muted/50 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
                    Secure image links expire after {Math.round(data.urlsExpireInSeconds / 60)} minutes.
                    Close and reopen this record to refresh them if needed.
                  </p>
                  {data.passportUrl && (
                    <a
                      href={data.passportUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-600 dark:text-emerald-300"
                    >
                      Open passport in new tab
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </section>
              </motion.div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function InfoPill({
  icon: Icon,
  label,
  value,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 items-start gap-2.5 rounded-xl border border-border/50 bg-muted/20 px-3 py-2.5",
        className,
      )}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="mt-0.5 break-words text-sm font-medium leading-snug text-foreground">{value}</p>
      </div>
    </div>
  );
}

function Detail({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 break-words text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}

function ImagePanel({ label, url }: { label: string; url: string | null }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-foreground">{label}</p>
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block overflow-hidden rounded-xl border border-border/60 bg-muted/30"
        >
          <img
            src={url}
            alt={label}
            className="max-h-72 w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </a>
      ) : (
        <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-border/70 bg-muted/20 text-sm text-muted-foreground">
          Image unavailable
        </div>
      )}
    </div>
  );
}
