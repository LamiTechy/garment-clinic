"use client";

import { useEffect, useState } from "react";
import { bookingSlots, timeSlots, services, type Service } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/section-header";
import { CheckCircle2, Calendar, User, FileText, Sparkles, ArrowRight } from "lucide-react";

type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes: string;
  createdAt: string;
};

export default function BookPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: services[0].id,
    date: bookingSlots[0],
    time: timeSlots[0],
    notes: "",
  });
  const [submitted, setSubmitted] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const reference = new URLSearchParams(window.location.search).get("reference");
    if (!reference) return;

    const verifyPayment = async () => {
      await Promise.resolve();
      setLoading(true);
      return fetch(`/api/paystack/verify?reference=${encodeURIComponent(reference)}`)
      .then(async (response) => {
        const result = (await response.json()) as { booking?: Booking; error?: string };
        if (!response.ok || !result.booking) {
          throw new Error(result.error || "Payment could not be verified.");
        }
        setSubmitted(result.booking);
        window.history.replaceState({}, "", "/book");
      })
      .catch((verificationError) => {
        setError(verificationError instanceof Error ? verificationError.message : "Payment could not be verified.");
      })
      .finally(() => setLoading(false));
    };

    void verifyPayment();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = (await response.json()) as {
        authorizationUrl?: string;
        error?: string;
      };

      if (!response.ok || !result.authorizationUrl) {
        throw new Error(result.error || "Could not start payment. Please try again.");
      }

      window.location.assign(result.authorizationUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSubmitted(null);
    setForm({
      name: "",
      email: "",
      phone: "",
      service: services[0].id,
      date: bookingSlots[0],
      time: timeSlots[0],
      notes: "",
    });
  };

  const serviceLabel = (id: string) => {
    const s = (services as Service[]).find((svc) => svc.id === id);
    return s ? s.title : id;
  };

  if (submitted) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-background py-16">
        <div className="mx-auto max-w-lg px-4 text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-success to-emerald-400 rounded-full blur-xl opacity-50" />
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-success to-emerald-400 flex items-center justify-center shadow-xl">
                <CheckCircle2 className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Booking Confirmed!</h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Thank you, <span className="font-bold text-foreground">{submitted.name}</span>. Your payment and booking have been received. Our team will contact you by email at <span className="font-bold text-foreground">{submitted.email}</span> to confirm the appointment.
          </p>
          <div className="mt-8 card p-6 text-left space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary flex-shrink-0">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <dt className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Service</dt>
                <dd className="mt-1 text-sm text-foreground font-semibold">{serviceLabel(submitted.service)}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary flex-shrink-0">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <dt className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Date & Time</dt>
                <dd className="mt-1 text-sm text-foreground font-semibold">
                  {new Date(submitted.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                  {" at "}
                  {submitted.time}
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary flex-shrink-0">
                <User className="h-5 w-5" />
              </div>
              <div>
                <dt className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Reference</dt>
                <dd className="mt-1 text-sm text-foreground font-semibold">#{submitted.id.split("-")[0]}</dd>
              </div>
            </div>
          </div>
          <button
            onClick={reset}
            className="mt-8 group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-light px-7 py-3.5 text-sm font-bold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            Book Another
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative container">
          <SectionHeader
            label="Schedule Now"
            title="Book Your Service Online"
            subtitle="Pick your service, date, and time, then complete payment securely to submit your booking."
            className="mb-12"
          />
          <div className="mx-auto max-w-2xl">
            <form
              onSubmit={handleSubmit}
              className="card-elevated p-6 sm:p-8 space-y-6"
            >
              <div>
                <label className="label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className="input"
                />
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="label">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="0802 853 2366"
                    className="input"
                  />
                </div>
              </div>
              <div>
                <label className="label">Service</label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="input"
                >
                  {services.map((svc) => (
                    <option key={svc.id} value={svc.id}>
                      {svc.title} - {svc.price}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="label">Date</label>
                  <select
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="input"
                  >
                    {bookingSlots.map((d) => (
                      <option key={d} value={d}>
                        {new Date(d).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">Time</label>
                  <select
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className="input"
                  >
                    {timeSlots.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="label">
                  Special Instructions (optional)
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="e.g. large agbada, prefer pickup, etc."
                  className="input resize-none"
                />
              </div>
              {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                  {error}
                </div>
              )}
              <Button type="submit" disabled={loading} variant="primary" className="w-full h-13 text-sm font-bold">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Preparing payment...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Continue to payment
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
