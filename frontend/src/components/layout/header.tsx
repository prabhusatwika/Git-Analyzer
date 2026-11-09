
"use client";

import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { navLinks, siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { RobotMascot } from "./robot-mascot";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#DEDCD1]/80 bg-[#F5F3EC]/90 backdrop-blur-xl">
      <div className="relative mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 lg:px-10">

        {/* Robot + Logo */}
        <div className="flex shrink-0 items-center gap-1">
          <RobotMascot />

          <Link href="/" className="group flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#52634D] text-sm font-bold tracking-tight text-white shadow-sm transition-transform duration-300 group-hover:rotate-[-5deg]">
              GA
            </span>

            <span className="text-lg font-bold tracking-tight text-[#303A32]">
              {siteConfig.name}
              <span className="text-[#849777]">.</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium text-[#777B72] transition-colors duration-200 hover:text-[#52634D]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Button
            variant="ghost"
            size="sm"
            className="font-medium text-[#52634D] hover:bg-[#E7E3D8]"
            render={<Link href="/login" />}
          >
            Sign In
          </Button>

          <Button
            size="sm"
            className="h-10 gap-2 rounded-lg bg-[#52634D] px-5 text-white shadow-sm transition-all hover:bg-[#3F503B] hover:shadow-md"
            render={<Link href="/login" />}
          >
            Get Started
            <ArrowUpRight className="size-4" />
          </Button>
        </div>

        {/* Mobile Menu */}
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-xl border border-[#DEDCD1] bg-[#FFFEFA] text-[#52634D] transition-colors hover:bg-[#E7E3D8] md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <X className="size-5" />
          ) : (
            <Menu className="size-5" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "border-t border-[#DEDCD1] bg-[#F5F3EC] md:hidden",
          mobileOpen ? "block" : "hidden",
        )}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-3 text-sm font-medium text-[#777B72] transition-colors hover:bg-[#E7E3D8] hover:text-[#52634D]"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-3 flex flex-col gap-2 border-t border-[#DEDCD1] pt-4">
            <Button
              variant="outline"
              className="border-[#DEDCD1] bg-[#FFFEFA] text-[#52634D]"
              render={<Link href="/login" />}
            >
              Sign In
            </Button>

            <Button
              className="bg-[#52634D] text-white hover:bg-[#3F503B]"
              render={<Link href="/login" />}
            >
              Get Started
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
