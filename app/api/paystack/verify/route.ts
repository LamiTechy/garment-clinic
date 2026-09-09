import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getServiceTitle, paystackCurrency } from "@/lib/paystack";
import { bookingEmailHtml } from "@/lib/email";

export async function GET(request: Request) {
  const reference = new URL(request.url).searchParams.get("reference");
  if (!reference || !process.env.PAYSTACK_SECRET_KEY) {
    return NextResponse.json({ error: "Payment reference is missing." }, { status: 400 });
  }

  const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
    cache: "no-store",
  });
  const result = await response.json() as {
    status?: boolean;
    data?: { status?: string; reference?: string; currency?: string; metadata?: Record<string, unknown> };
  };
  const transaction = result.data;
  if (!response.ok || !result.status || transaction?.status !== "success" || transaction.currency !== paystackCurrency) {
    return NextResponse.json({ error: "Payment could not be verified." }, { status: 400 });
  }

  const metadata = transaction.metadata || {};
  const fields = ["name", "email", "phone", "service", "date", "time"];
  if (!fields.every((field) => typeof metadata[field] === "string" && metadata[field])) {
    return NextResponse.json({ error: "Payment details are incomplete." }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const { data: existing } = await supabase.from("bookings").select("*").eq("payment_reference", reference).maybeSingle();
  if (existing) return NextResponse.json({ booking: existing });

  const booking = {
    name: metadata.name as string,
    email: metadata.email as string,
    phone: metadata.phone as string,
    service: metadata.service as string,
    date: metadata.date as string,
    time: metadata.time as string,
    notes: typeof metadata.notes === "string" ? metadata.notes : "",
    payment_status: "paid",
    payment_reference: reference,
  };
  const { data: saved, error } = await supabase.from("bookings").insert(booking).select("*").single();
  if (error || !saved) {
    console.error("Paid booking insert failed:", error ? {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    } : "No booking returned");
    return NextResponse.json({ error: "Payment succeeded but booking could not be saved." }, { status: 500 });
  }

  if (process.env.BREVO_SMTP_USER && process.env.BREVO_SMTP_PASSWORD && process.env.BREVO_FROM_EMAIL && process.env.ADMIN_EMAIL) {
    const transporter = nodemailer.createTransport({ host: "smtp-relay.brevo.com", port: 587, secure: false, auth: { user: process.env.BREVO_SMTP_USER, pass: process.env.BREVO_SMTP_PASSWORD } });
    await transporter.sendMail({
      from: { name: "Ace Wash N Dry Website", address: process.env.BREVO_FROM_EMAIL },
      to: process.env.ADMIN_EMAIL,
      replyTo: booking.email,
      subject: `Paid booking from ${booking.name}`,
      text: [`New paid booking`, `Name: ${booking.name}`, `Email: ${booking.email}`, `Phone: ${booking.phone}`, `Service: ${getServiceTitle(booking.service)}`, `Date: ${booking.date}`, `Time: ${booking.time}`, `Payment reference: ${reference}`, `Notes: ${booking.notes || "None"}`].join("\n"),
      html: bookingEmailHtml({
        name: booking.name,
        email: booking.email,
        phone: booking.phone,
        service: getServiceTitle(booking.service),
        date: booking.date,
        time: booking.time,
        notes: booking.notes,
        paymentReference: reference,
      }, "Paid booking received", "A new paid booking has been submitted through the website."),
    });
  }

  return NextResponse.json({ booking: saved });
}
