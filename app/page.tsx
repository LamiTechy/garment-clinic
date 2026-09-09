"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig, services } from "@/lib/site-config";
import { SectionHeader } from "@/components/common/section-header";
import { ServiceCard } from "@/components/common/service-card";
import { Clock, MapPin, Phone, Shield, Star, Truck, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

export default function HomePage() {
  const today = new Date().toLocaleString("en-US", { weekday: "long" });
  const todayHours =
    siteConfig.hours.find((h) => h.day === today) ?? siteConfig.hours[0];

  const stats = [
    { label: "Google Rating", value: "4.962", icon: Star },
    { label: "Happy Customers", value: "10,000+", icon: CheckCircle2 },
    { label: "Garments Cleaned", value: "100K+", icon: Sparkles },
    { label: "5-Star Reviews", value: "500+", icon: Shield },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=1920&q=80&auto=format"
            alt="Professional laundry service"
            fill
            className="object-cover scale-105"
            priority={true}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary-dark/75 to-black/50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/25 via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-5 py-2 text-sm font-medium text-white animate-fade-in">
                <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
                Rated {siteConfig.googleRating} on Google
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] animate-slide-up stagger-1">
                Professional
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-300">
                  Garment Care
                </span>
                You Can Trust
              </h1>

              <p className="text-lg sm:text-xl text-white/85 max-w-lg leading-relaxed animate-slide-up stagger-2">
                Expert laundry, dry cleaning, and garment care services in Ikeja, Lagos. 
                Trusted by thousands with a 4.962 Google rating.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up stagger-3">
                <Link
                  href="/book"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold text-primary hover:bg-white/90 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                >
                  Book Now
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 text-sm font-semibold text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300"
                >
                  Our Services
                </Link>
              </div>

              <div className="flex items-center gap-4 pt-4 animate-slide-up stagger-4">
                <div className="flex items-center gap-2 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 px-4 py-2.5">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium text-white">
                    Today: {todayHours.open === "Closed" ? "Closed" : `${todayHours.open} - ${todayHours.close}`}
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 px-4 py-2.5">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium text-white">Ikeja, Lagos</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-primary/30 rounded-3xl blur-3xl" />
              <div className="relative grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="bg-white rounded-2xl p-6 text-center shadow-xl animate-fade-in"
                    style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-orange-400 text-white mb-3">
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Stats Mobile */}
      <section className="lg:hidden -mt-8 relative z-10 px-4">
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="card-elevated p-4 text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-light text-white mb-2">
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="section bg-background">
        <div className="container">
          <SectionHeader
            label="Our Services"
            title="What We Offer"
            subtitle="From everyday wash & iron to expert dry cleaning, we've got your garment care covered."
            className="mb-16"
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <SectionHeader
                label="Why Choose Us"
                title="More Than Just Clean Clothes"
                subtitle="We go the extra mile to make your laundry experience effortless."
                className="text-left mb-0"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Shield, title: "Quality Guaranteed", desc: "Professional cleaning with premium detergents." },
                  { icon: Truck, title: "Pickup & Delivery", desc: "Convenient doorstep service in Ikeja." },
                  { icon: Star, title: "4.962 Rating", desc: "Trusted by thousands of customers." },
                  { icon: Clock, title: "Fast Turnaround", desc: "Same-day and next-day service." },
                ].map((feature) => (
                  <div key={feature.title} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary">
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">{feature.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1619032468883-89a84f565cba?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZvbGRlZCUyMGxhdW5kcnl8ZW58MHx8MHx8fDA%3D"
                  alt="Clean folded laundry"
                  width={600}
                  height={400}
                  className="object-cover w-full h-[400px]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass rounded-2xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-orange-400 flex items-center justify-center text-white">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-bold text-foreground">Expert Care</div>
                        <div className="text-sm text-muted-foreground">For your finest garments</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-background">
        <div className="container">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-black" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/30 via-transparent to-transparent" />
            <div className="relative z-10 px-6 py-16 sm:px-12 sm:py-20 text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-5 py-2 text-sm font-medium text-white mb-8">
                <Sparkles className="w-4 h-4 text-accent" />
                Custom Orders Welcome
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Experience the Difference?
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-white/80 mb-10">
                Large orders, specialty garments, or special requests? Contact us to discuss your needs and get a personalized quote.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/book"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold text-primary hover:bg-white/90 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                >
                  Book Now
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 text-sm font-semibold text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
