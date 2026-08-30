import { footer, nav } from "@/data/nasyowwa";

export function SiteFooter() {
  return (
    <footer className="grid-bg border-t border-border py-14">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <img src="/logo.png" alt={footer.brand} className="h-40 w-40 drop-shadow-[0_0_25px_oklch(0.53_0.25_328/0.7)]" />
            <p className="mt-2 text-sm font-medium text-brand">{footer.fullName}</p>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">{footer.tagline}</p>
          </div>
          <nav aria-label="Footer" className="md:justify-self-end">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
              {nav.map((item) => (
                <li key={item.target}>
                  <a
                    href={item.target}
                    className="text-sm text-muted-foreground transition-colors hover:text-brand"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">
          {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
