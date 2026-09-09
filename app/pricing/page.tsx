"use client";

import { priceList } from "@/lib/site-config";
import { SectionHeader } from "@/components/common/section-header";
import Link from "next/link";
import { Tag, Info, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

const highlights = [
  "No hidden fees or surprises",
  "Transparent per-piece pricing",
  "Volume discounts for commercial",
  "Free starch with wash & iron",
];

export default function PricingPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative container">
          <SectionHeader
            label="Pricing"
            title="Simple, Transparent Pricing"
            subtitle="No hidden fees. No surprises. Just fair, straightforward pricing for every service."
            className="mb-16"
          />

          <div className="mx-auto max-w-4xl">
            <div className="card-elevated overflow-hidden">
              <div className="bg-gradient-to-r from-primary via-primary-dark to-black p-6 sm:p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/30 via-transparent to-transparent" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-5 py-2 text-sm font-medium text-white mb-4">
                    <Tag className="h-4 w-4" />
                    All Services
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">Our Price List</h3>
                </div>
              </div>
              
              {/* Desktop Table */}
              <table className="hidden sm:table min-w-full divide-y divide-border">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Service
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {priceList.map((item, index) => (
                    <tr key={item.service} className={`transition-colors hover:bg-primary/5 ${index % 2 === 0 ? 'bg-muted/20' : 'bg-background'}`}>
                      <td className="px-6 py-4 text-sm text-foreground font-medium">{item.service}</td>
                      <td className="px-6 py-4 text-sm font-bold text-primary text-right">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {/* Mobile Cards */}
              <div className="sm:hidden divide-y divide-border">
                {priceList.map((item, index) => (
                  <div key={item.service} className={`flex items-center justify-between gap-4 px-4 py-4 ${index % 2 === 0 ? 'bg-muted/20' : 'bg-background'}`}>
                    <span className="text-sm text-foreground font-medium">{item.service}</span>
                    <span className="text-sm font-bold text-primary shrink-0">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Note */}
            <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light text-white">
                  <Info className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Note</h4>
                  <p className="text-sm text-muted-foreground mt-1">Prices are subject to change. Commercial and bulk orders receive custom pricing. Contact us for a personalized quote.</p>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-3 p-4 rounded-xl bg-white border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 text-primary">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span className="text-sm text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 text-center">
              <Link
                href="/book"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-light px-8 py-4 text-sm font-bold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Book Your Service
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
