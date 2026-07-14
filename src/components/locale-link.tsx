"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n-provider";
import { localizedPath } from "@/i18n/config";
import type { ComponentProps } from "react";

type LocaleLinkProps = ComponentProps<typeof Link>;

export function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const { locale } = useI18n();
  const path = typeof href === "string" ? localizedPath(href, locale) : href;
  return <Link href={path} {...props} />;
}
