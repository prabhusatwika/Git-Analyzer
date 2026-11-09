
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { footerLinks, siteConfig } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-[#DEDCD1] bg-[#F4F2E9]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">

          <div className="space-y-5 lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-3 font-semibold tracking-tight text-[#303A32]"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-[#52634D] text-sm font-semibold text-white shadow-sm">
                GA
              </span>
              <span className="text-lg">{siteConfig.name}</span>
            </Link>

            <p className="max-w-xs text-sm leading-7 text-[#777B72]">
              {siteConfig.tagline}
            </p>

            <Button
              size="sm"
              className="gap-2 rounded-lg bg-[#52634D] text-white hover:bg-[#3F503B]"
            >
              Get Started Free
              <ArrowRight className="size-3.5" />
            </Button>
          </div>

          <FooterColumn title="Product" links={footerLinks.product} />
          <FooterColumn title="Company" links={footerLinks.company} />
          <FooterColumn title="Legal" links={footerLinks.legal} />

        </div>

        <Separator className="my-9 bg-[#DEDCD1]" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-[#85887D] sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>Built for teams who care about code quality.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div className="space-y-5">
      <h3 className="text-sm font-semibold text-[#303A32]">
        {title}
      </h3>

      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-[#777B72] transition-colors duration-200 hover:text-[#52634D]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
