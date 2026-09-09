"use client";

import Link from "next/link";
import { Service } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import {
  WashingMachine,
  Shirt,
  BrushCleaning,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const iconComponents = {
  WashingMachine,
  Shirt,
  BrushCleaning,
  Sparkles,
};

const gradients = [
  "from-blue-500 to-blue-600",
  "from-emerald-500 to-emerald-600",
  "from-violet-500 to-violet-600",
  "from-orange-500 to-orange-600",
];

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const IconComponent = iconComponents[service.icon as keyof typeof iconComponents] || WashingMachine;
  const gradient = gradients[index % gradients.length];
  
  return (
    <div className="group card-elevated h-full flex flex-col overflow-hidden">
      <div className="flex flex-col flex-1 p-6">
        <div
          className={cn(
            "mb-5 w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl",
            gradient
          )}
        >
          <IconComponent className="h-7 w-7 transition-transform duration-300 group-hover:rotate-3" />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
        <p className="text-sm text-muted-foreground flex-1 leading-relaxed">
          {service.description}
        </p>
        <ul className="mt-4 space-y-2">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2.5 text-sm text-muted-foreground/80 transition-colors duration-200 group-hover:text-foreground">
              <span className={cn("flex h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r transition-transform duration-200 group-hover:scale-125", gradient)} />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-between border-t border-card-border px-6 py-4 bg-muted/30 transition-colors duration-300 group-hover:bg-primary/5">
        <span className="text-lg font-bold text-primary">{service.price}</span>
        <Link
          href="/book"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark transition-colors group-hover:gap-2.5"
        >
          Book now
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
