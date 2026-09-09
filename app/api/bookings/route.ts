import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { bookingSlots, services, timeSlots } from "@/lib/site-config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const requiredEnvironment = [
  "BREVO_SMTP_USER",
  "BREVO_SMTP_PASSWORD",
  "BREVO_FROM_EMAIL",
  "ADMIN_EMAIL",
] as const;

type BookingPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  service?: unknown;
  date?: unknown;
  time?: unknown;
  notes?: unknown;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: Request) {
  try {
    const missingEnvironment = requiredEnvironment.filter((key) => !process.env[key]);
    if (missingEnvironment.length > 0) {
      console.error("Booking email is not configured. Missing:", missingEnvironment);
      return NextResponse.json(
        { error: "Booking email is temporarily unavailable. Please call us instead." },
        { status: 503 }
      );
    }

    const payload = (await request.json()) as BookingPayload;
    const { name, email, phone, service, date, time, notes } = payload;

    if (![name, email, phone, service, date, time].every(isNonEmptyString)) {
      return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    }

    const bookingName = name as string;
    const bookingEmail = email as string;
    const bookingPhone = phone as string;
    const bookingService = service as string;
    const bookingDate = date as string;
    const bookingTime = time as string;

    if (!/^\S+@\S+\.\S+$/.test(bookingEmail)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const selectedService = services.find((item) => item.id === bookingService);
    if (!selectedService || !bookingSlots.includes(bookingDate as (typeof bookingSlots)[number])) {
      return NextResponse.json({ error: "Please choose a valid service and date." }, { status: 400 });
    }

    if (!timeSlots.includes(bookingTime as (typeof timeSlots)[number])) {
      return NextResponse.json({ error: "Please choose a valid time." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_PASSWORD,
      },
    });

    const bookingId = crypto.randomUUID();
    const submittedAt = new Date().toISOString();
    const supabase = await createSupabaseServerClient();
    const { error: insertError } = await supabase.from("bookings").insert({
      id: bookingId,
      name: bookingName,
      email: bookingEmail,
      phone: bookingPhone,
      service: bookingService,
      date: bookingDate,
      time: bookingTime,
      notes: isNonEmptyString(notes) ? notes : "",
    });
    if (insertError) {
      console.error("Booking database insert failed:", insertError);
      return NextResponse.json({ error: "We could not save your booking. Please try again." }, { status: 500 });
    }
    const message = [
      `New booking request #${bookingId.split("-")[0]}`,
      "",
      `Name: ${bookingName}`,
      `Email: ${bookingEmail}`,
      `Phone: ${bookingPhone}`,
      `Service: ${selectedService.title}`,
      `Date: ${bookingDate}`,
      `Time: ${bookingTime}`,
      `Notes: ${isNonEmptyString(notes) ? notes : "None"}`,
      `Submitted: ${submittedAt}`,
    ].join("\n");

    await transporter.sendMail({
      from: { name: "Ace Wash N Dry Website", address: process.env.BREVO_FROM_EMAIL as string },
      to: process.env.ADMIN_EMAIL as string,
      replyTo: bookingEmail,
      subject: `New booking request from ${bookingName}`,
      text: message,
    });

    return NextResponse.json({
      booking: {
        id: bookingId,
        name: bookingName,
        email: bookingEmail,
        phone: bookingPhone,
        service: bookingService,
        date: bookingDate,
        time: bookingTime,
        notes: isNonEmptyString(notes) ? notes : "",
        createdAt: submittedAt,
      },
    });
  } catch (error) {
    console.error("Booking submission failed:", error);
    return NextResponse.json(
      { error: "We could not send your booking. Please try again or call us." },
      { status: 500 }
    );
  }
}
