import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getAdminUser } from "@/lib/admin-auth";
import { messageEmailHtml } from "@/lib/email";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { supabase, user } = await getAdminUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { message } = await request.json() as { message?: string };
  if (!message?.trim()) return NextResponse.json({ error: "Message is required" }, { status: 400 });
  if (!process.env.BREVO_SMTP_USER || !process.env.BREVO_SMTP_PASSWORD || !process.env.BREVO_FROM_EMAIL) {
    return NextResponse.json({ error: "Email is not configured" }, { status: 503 });
  }
  const { id } = await params;
  const { data: booking, error } = await supabase.from("bookings").select("name, email, service, date, time").eq("id", id).single();
  if (error || !booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });

  const transporter = nodemailer.createTransport({ host: "smtp-relay.brevo.com", port: 587, secure: false, auth: { user: process.env.BREVO_SMTP_USER, pass: process.env.BREVO_SMTP_PASSWORD } });
  await transporter.sendMail({
    from: { name: "Ace Wash N Dry", address: process.env.BREVO_FROM_EMAIL },
    to: booking.email,
    replyTo: process.env.ADMIN_EMAIL,
    subject: "Message from Ace Wash N Dry",
    text: `Hi ${booking.name},\n\n${message.trim()}\n\nYour booking: ${booking.service} on ${booking.date} at ${booking.time}.\n\nAce Wash N Dry`,
    html: messageEmailHtml(booking.name, message.trim(), booking.service, booking.date, booking.time),
  });
  return NextResponse.json({ ok: true });
}
