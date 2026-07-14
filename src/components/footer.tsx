"use client";

import { useI18n } from "@/components/i18n-provider";
import { LocaleLink } from "@/components/locale-link";
import { APP_NAME, CONTACT_EMAIL, GITHUB_REPO_URL } from "@/lib/data";

export function Footer() {
  const { dict } = useI18n();
  const t = dict.footer;

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <LocaleLink href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
                <span className="text-sm font-bold text-background">M</span>
              </div>
              <span className="text-lg font-semibold">{APP_NAME}</span>
            </LocaleLink>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t.tagline}
            </p>
            <p className="mt-3 text-sm font-medium text-primary">{t.hospitals}</p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">{t.product}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <LocaleLink href="/#features" className="hover:text-foreground">
                  {dict.nav.features}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink href="/pricing" className="hover:text-foreground">
                  {dict.nav.pricing}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink href="/#faq" className="hover:text-foreground">
                  {dict.nav.faqs}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink href="/industries" className="hover:text-foreground">
                  {dict.nav.blueprints}
                </LocaleLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">{t.company}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a
                  href={GITHUB_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-foreground">
                  {t.contact}
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/mland_io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground"
                >
                  X
                </a>
              </li>
              <li>
                <LocaleLink href="/privacy" className="hover:text-foreground">
                  {t.privacy}
                </LocaleLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {APP_NAME}. {t.rights}
          </p>
          <div className="flex gap-6">
            <LocaleLink href="/privacy" className="hover:text-foreground">
              {t.privacy}
            </LocaleLink>
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-foreground">
              {t.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
