"use client";

import { useI18n } from "@/components/i18n-provider";

export function PrivacyPageContent() {
  const { dict } = useI18n();
  const t = dict.privacy;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">{t.title}</h1>
      <div className="prose-mland mt-8">
        <p>{t.lastUpdated}</p>
        <h2>{t.collectionTitle}</h2>
        <p>{t.collectionBody}</p>
        <h2>{t.usageTitle}</h2>
        <p>{t.usageBody}</p>
        <h2>{t.contactTitle}</h2>
        <p>
          {t.contactBody}{" "}
          <a href="mailto:privacy@mland.io">privacy@mland.io</a>
          {t.contactSuffix}
        </p>
      </div>
    </div>
  );
}
