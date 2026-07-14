"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { ProUpgradeButton } from "@/components/pro-upgrade-button";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { LocaleLink } from "@/components/locale-link";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";
import { APP_NAME, GITHUB_REPO_URL } from "@/lib/data";

export function Header() {
  const { dict } = useI18n();
  const t = dict.nav;

  const navItems = [
    { href: "/#features", label: t.features },
    { href: "/#services", label: t.services },
    { href: "/#pricing", label: t.pricing },
    { href: "/#faq", label: t.faqs },
  ] as const;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <LocaleLink href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
            <span className="text-sm font-bold text-background">M</span>
          </div>
          <span className="text-lg font-semibold tracking-tight">{APP_NAME}</span>
        </LocaleLink>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <LocaleLink
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </LocaleLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher className="hidden sm:flex" />
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden text-muted-foreground sm:inline-flex"
          >
            <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer">
              {t.github}
            </a>
          </Button>
          <ThemeToggle />
          <ProUpgradeButton className="hidden sm:inline-flex" />
        </div>
      </div>
    </header>
  );
}
