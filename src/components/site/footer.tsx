import { footer, nav } from "@/data/napyw";

export function SiteFooter() {
  return (
    <footer className="grid-bg border-t border-border py-14">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 items-start">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt={footer.brand}
                className="h-24 w-24 object-contain drop-shadow-[0_0_20px_oklch(0.53_0.25_328/0.7)]"
              />
              <div>
                <span className="font-display text-2xl font-bold tracking-tight text-foreground">
                  {footer.brand}
                </span>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                  {footer.fullName}
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-md text-sm font-medium text-foreground">
              {footer.tagline}
            </p>

            <p className="mt-2 max-w-md text-xs text-muted-foreground">
              {footer.affiliation}
            </p>
          </div>

          <nav aria-label="Footer" className="md:justify-self-end">
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">
              Quick Links
            </p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2.5">
              {nav.map((item) => (
                <li key={item.target}>
                  <a
                    href={`/${item.target}`}
                    className="text-xs text-muted-foreground transition-colors hover:text-brand"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/register"
                  className="text-xs font-semibold text-brand transition-colors hover:underline"
                >
                  Membership Form
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between border-t border-border pt-6 gap-4 text-xs text-muted-foreground">
          <p>{footer.copyright}</p>
          <p className="text-[11px]">Nasarawa State, Nigeria</p>
        </div>
      </div>
    </footer>
  );
}
