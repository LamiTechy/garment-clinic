"use client";

import { services } from "@/lib/site-config";
import { SectionHeader } from "@/components/common/section-header";
import { ServiceCard } from "@/components/common/service-card";
import Link from "next/link";
import { Sparkles, Truck, Clock, Shield, CheckCircle2, ArrowRight } from "lucide-react";

const benefits = [
  { icon: Sparkles, title: "Eco-Friendly", desc: "Green detergents and energy-efficient machines for a lighter footprint.", gradient: "from-emerald-500 to-emerald-600" },
  { icon: Truck, title: "Pickup & Delivery", desc: "Convenient doorstep service at your preferred time.", gradient: "from-blue-500 to-blue-600" },
  { icon: Clock, title: "Same-Day Service", desc: "Fast turnaround for busy schedules and last-minute needs.", gradient: "from-violet-500 to-violet-600" },
  { icon: Shield, title: "Satisfaction Guaranteed", desc: "We stand behind every order with a quality promise.", gradient: "from-orange-500 to-orange-600" },
];

const processSteps = [
  { step: "01", title: "Drop Off or Schedule", desc: "Bring your laundry to our location or schedule a convenient pickup time online.", gradient: "from-primary to-primary-light" },
  { step: "02", title: "We Handle the Rest", desc: "Our team sorts, cleans, and presses with professional care and premium detergents.", gradient: "from-accent to-orange-400" },
  { step: "03", title: "Ready for Pickup", desc: "Your clean, pressed garments are ready for pickup or delivery within 24 hours.", gradient: "from-emerald-500 to-emerald-600" },
];

export default function ServicesPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative container">
          <SectionHeader
            label="Services"
            title="Laundry & Dry Cleaning Services"
            subtitle="We offer a complete range of garment care services to fit your schedule and needs."
            className="mb-16"
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section bg-muted/50">
        <div className="container">
          <SectionHeader
            label="How It Works"
            title="Simple Process, Perfect Results"
            subtitle="Three easy steps to fresh, clean garments without the hassle."
            className="mb-16"
          />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {processSteps.map((step, index) => (
              <div key={step.title} className="relative card p-6 sm:p-8 text-center group hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {step.step}
                </div>
                <div className="pt-8">
                  <h3 className="text-lg font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
                {index < 2 && (
                  <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/30 to-primary/10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section bg-background">
        <div className="container">
          <SectionHeader
            label="Why Choose Us"
            title="More Than Just Clean Clothes"
            subtitle="We go the extra mile to make your laundry experience effortless."
            className="mb-16"
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="card p-6 text-center card-hover group"
              >
                <div className={`mx-auto mb-5 w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}>
                  <benefit.icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-muted/50">
        <div className="container">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-black" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/30 via-transparent to-transparent" />
            <div className="relative z-10 px-6 py-16 sm:px-12 sm:py-20 text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-5 py-2 text-sm font-medium text-white mb-8">
                <CheckCircle2 className="w-4 h-4" />
                Custom Orders Welcome
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Have a Custom Request?
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-white/80 mb-10">
                Large orders, specialty garments, or special requests? Contact us to discuss your needs and get a personalized quote.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold text-primary hover:bg-white/90 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
              >
                Contact Us
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
