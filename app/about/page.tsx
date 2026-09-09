"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/common/section-header";
import { Shield, Star, Truck, Leaf, Users, Award, ArrowRight, Sparkles } from "lucide-react";

const values = [
  { icon: Shield, title: "Quality First", desc: "Professional cleaning with premium detergents and expert garment care for the best results.", gradient: "from-blue-500 to-blue-600" },
  { icon: Star, title: "Customer Care", desc: "Friendly, knowledgeable staff dedicated to making your experience effortless.", gradient: "from-violet-500 to-violet-600" },
  { icon: Leaf, title: "Eco-Conscious", desc: "Green cleaning solutions and energy-efficient machines for a smaller footprint.", gradient: "from-emerald-500 to-emerald-600" },
  { icon: Truck, title: "Convenience", desc: "Pickup, delivery, and fast turnaround options that fit your schedule.", gradient: "from-orange-500 to-orange-600" },
  { icon: Users, title: "Community Focused", desc: "Serving Ikeja and Lagos with reliable, professional garment care.", gradient: "from-pink-500 to-pink-600" },
  { icon: Award, title: "Trusted Reputation", desc: "4.962 Google rating from hundreds of satisfied customers and businesses.", gradient: "from-amber-500 to-amber-600" },
];

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative container">
          <SectionHeader
            label="Our Story"
            title="About Garment Clinic Ltd"
            subtitle="We are dedicated to providing clean, reliable, and professional laundry services in Ikeja, Lagos."
            className="mb-16"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Garment Clinic Ltd was established with the goal of making professional garment care
                accessible to everyone in Ikeja, Lagos. We provide expert laundry, dry cleaning,
                and garment care services with a commitment to quality.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you need a quick wash & iron for your office wear or expert dry cleaning
                for your finest garments, we&apos;ve got you covered. Our mission is simple:
                professional garment care you can trust.
              </p>
              <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Our Mission
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  To provide fast, reliable, and professional laundry and dry cleaning services while
                  maintaining the highest standards of cleanliness and customer satisfaction.
                </p>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="font-semibold text-foreground">Vision:</strong> To be
                the trusted garment care partner for families and businesses across Lagos.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1521656693884-5bdcf3fc3a27?w=800&q=80&auto=format"
                  alt="Professional laundry service"
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
                        <div className="font-bold text-white">Professional Service</div>
                        <div className="text-sm text-white/70">Since establishment</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section bg-muted/50">
        <div className="container">
          <SectionHeader
            label="Our Values"
            title="What We Stand For"
            subtitle="These principles guide everything we do, from the detergents we choose to how we treat every customer."
            className="mb-16"
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="card p-6 card-hover group">
                <div className={`mb-5 w-14 h-14 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}>
                  <value.icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="section bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&q=80&auto=format"
                  alt="Customer sorting clothes"
                  width={600}
                  height={400}
                  className="object-cover w-full h-[400px]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Our Commitment to You
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every piece of clothing that comes through our doors is treated with care.
                We understand that your garments are more than fabric — they&apos;re investments,
                memories, and essentials for daily life.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Professional Service", "Eco-Friendly Products", "Fast Turnaround", "Pickup & Delivery"].map((tag) => (
                  <span key={tag} className="badge-primary">
                    <Sparkles className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-light px-7 py-3.5 text-sm font-bold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                View Our Services
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
