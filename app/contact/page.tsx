"use client";

import { siteConfig } from "@/lib/site-config";
import { SectionHeader } from "@/components/common/section-header";
import Link from "next/link";
import { MapPin, Clock, Phone, Mail, Send, MessageSquare, Sparkles, ArrowRight } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative container">
          <SectionHeader
            label="Get in Touch"
            title="Contact Us"
            subtitle="Have a question? Send us a message and we'll get back to you."
            className="mb-12"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="card-elevated p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light text-white">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Send us a message</h3>
                </div>
                <form className="grid grid-cols-1 gap-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="label">Name</label>
                      <input
                        type="text"
                        placeholder="Jane Doe"
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">Email</label>
                      <input
                        type="email"
                        placeholder="jane@example.com"
                        className="input"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="label">Phone</label>
                    <input
                      type="tel"
                      placeholder="0802 853 2366"
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="label">Message</label>
                    <textarea
                      rows={5}
                      placeholder="How can we help you?"
                      className="input resize-none"
                    />
                  </div>
                  <Link
                    href="/book"
                    className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-light px-7 py-3.5 text-sm font-bold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 w-fit"
                  >
                    <Send className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                    Send Message
                  </Link>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="card p-5 card-hover group">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary transition-all duration-300 group-hover:from-primary group-hover:to-primary-light group-hover:text-white">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Address</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {siteConfig.address.street}<br />
                      {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
                    </p>
                  </div>
                </div>
              </div>

              <div className="card p-5 card-hover group">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary transition-all duration-300 group-hover:from-primary group-hover:to-primary-light group-hover:text-white">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-foreground">Hours</h3>
                    <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                      {siteConfig.hours.map((h) => (
                        <li key={h.day} className="flex justify-between gap-2">
                          <span className="truncate">{h.day}</span>
                          <span className="font-medium text-foreground whitespace-nowrap text-xs">
                            {h.open === "Closed" ? "Closed" : `${h.open} - ${h.close}`}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="card p-5 card-hover group">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary transition-all duration-300 group-hover:from-primary group-hover:to-primary-light group-hover:text-white">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Phone</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      <a
                        href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
                        className="hover:text-primary transition-colors font-medium"
                      >
                        {siteConfig.phone}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="card p-5 card-hover group">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary transition-all duration-300 group-hover:from-primary group-hover:to-primary-light group-hover:text-white">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Email</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="hover:text-primary transition-colors font-medium"
                      >
                        {siteConfig.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
