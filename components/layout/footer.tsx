"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig, navigation } from "@/lib/site-config";
import { MapPin, Phone, Mail, Star, ArrowRight, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-foreground text-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-3" aria-label="Garment Clinic Ltd Home">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-2xl blur-lg opacity-50" />
                <Image
                  src="/logo.jpg"
                  alt=""
                  width={48}
                  height={48}
                  className="relative h-12 w-12 rounded-2xl object-cover shadow-lg"
                />
              </div>
              <div>
                <span className="text-xl font-bold text-white">Garment Clinic</span>
                <span className="block text-xs text-white/60 font-medium">Professional Care</span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              {siteConfig.tagline}. Trusted by thousands in Ikeja, Lagos with a {siteConfig.googleRating} Google rating.
            </p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-sm font-semibold text-white">{siteConfig.googleRating}</span>
              <span className="text-sm text-white/50">({siteConfig.totalReviews})</span>
            </div>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/60 hover:bg-primary hover:text-white transition-all duration-300" aria-label="Instagram">
                <span className="text-sm font-bold">ig</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/60 hover:bg-primary hover:text-white transition-all duration-300" aria-label="WhatsApp">
                <span className="text-sm font-bold">wa</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/60 hover:bg-primary hover:text-white transition-all duration-300" aria-label="Facebook">
                <span className="text-sm font-bold">f</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 text-sm text-white/60 hover:text-accent transition-colors group"
                  >
                    {item.name}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-5">
              Business Hours
            </h3>
            <ul className="space-y-3 text-sm">
              {siteConfig.hours.map((h) => (
                <li key={h.day} className="flex items-center justify-between gap-4">
                  <span className="text-white/60">{h.day}</span>
                  <span className="font-medium text-white whitespace-nowrap">
                    {h.open === "Closed" ? "Closed" : `${h.open} - ${h.close}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-5">
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-4 w-4 text-accent" />
                </div>
                <address className="not-italic text-white/60 leading-relaxed">
                  {siteConfig.address.street}<br />
                  {siteConfig.address.city}, {siteConfig.address.state}
                </address>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-4 w-4 text-accent" />
                </div>
                <a
                  href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
                  className="text-white/60 hover:text-accent transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4 text-accent" />
                </div>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-white/60 hover:text-accent transition-colors"
                >
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/40 text-center md:text-left">
              &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/60">
                <Sparkles className="w-3 h-3 text-accent" />
                Professional Service
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/60">
                <Sparkles className="w-3 h-3 text-accent" />
                Quality Guaranteed
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/60">
                <Sparkles className="w-3 h-3 text-accent" />
                Pickup & Delivery
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
