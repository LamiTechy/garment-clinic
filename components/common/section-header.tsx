"use client";

export function SectionHeader({
  title,
  subtitle,
  center = true,
  label,
  className,
}: {
  title: string;
  subtitle?: string;
  center?: boolean;
  label?: string;
  className?: string;
}) {
  return (
    <div className={`mb-12 ${center ? "text-center" : "text-left"} ${className ?? ""}`}>
      {label && (
        <span className="badge-primary mb-4 inline-block animate-fade-in">
          {label}
        </span>
      )}
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl animate-slide-up stagger-1">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-base sm:text-lg text-muted-foreground mx-auto leading-relaxed animate-slide-up stagger-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}
