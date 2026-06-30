import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { ProUpgradeButton } from "@/components/pro-upgrade-button";
import { APP_NAME, GITHUB_REPO_URL } from "@/lib/data";

const navItems = [
  { href: "/industries", label: "行业方案" },
  { href: "/pricing", label: "定价" },
  { href: "/docs/getting-started", label: "开发者文档" },
  { href: GITHUB_REPO_URL, label: "GitHub", external: true },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-mland-navy dark:bg-primary">
            <span className="text-sm font-bold text-white dark:text-mland-navy">
              M
            </span>
          </div>
          <span className="text-lg font-bold tracking-tight">{APP_NAME}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) =>
            "external" in item && item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ProUpgradeButton className="hidden sm:inline-flex" />
        </div>
      </div>
    </header>
  );
}
