import { NextResponse } from "next/server";
import { bookingSlots, services, timeSlots } from "@/lib/site-config";
import { getServiceAmount, paystackCurrency } from "@/lib/paystack";

type BookingPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  service?: unknown;
  date?: unknown;
  time?: unknown;
  notes?: unknown;
};

function isText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: Request) {
  if (!process.env.PAYSTACK_SECRET_KEY) {
    return NextResponse.json({ error: "Payment is not configured yet." }, { status: 503 });
  }

  const payload = await request.json() as BookingPayload;
  const { name, email, phone, service, date, time, notes } = payload;
  if (![name, email, phone, service, date, time].every(isText)) {
    return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  }
  const bookingEmail = email as string;
  const bookingService = service as string;
  const bookingDate = date as string;
  const bookingTime = time as string;
  if (!/^\S+@\S+\.\S+$/.test(bookingEmail)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!services.some((item) => item.id === bookingService) || !bookingSlots.includes(bookingDate as (typeof bookingSlots)[number]) || !timeSlots.includes(bookingTime as (typeof timeSlots)[number])) {
    return NextResponse.json({ error: "Please choose valid booking options." }, { status: 400 });
  }

  const amount = getServiceAmount(bookingService);
  if (!amount) return NextResponse.json({ error: "This service is not available for online payment yet." }, { status: 400 });

  const reference = `ace_${crypto.randomUUID().replaceAll("-", "")}`;
  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: bookingEmail,
      amount,
      currency: paystackCurrency,
      reference,
      callback_url: `${new URL(request.url).origin}/book`,
      metadata: { name, email: bookingEmail, phone, service: bookingService, date: bookingDate, time: bookingTime, notes: isText(notes) ? notes : "" },
    }),
  });
  const result = await response.json() as { status?: boolean; message?: string; data?: { authorization_url?: string } };
  if (!response.ok || !result.status || !result.data?.authorization_url) {
    console.error("Paystack initialization failed:", result);
    return NextResponse.json({ error: "Could not start payment. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ authorizationUrl: result.data.authorization_url });
}
