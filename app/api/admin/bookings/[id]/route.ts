import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-auth";

const statuses = ["pending", "confirmed", "completed", "cancelled"] as const;

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { supabase, user } = await getAdminUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { status } = await request.json() as { status?: string };
  if (!status || !statuses.includes(status as (typeof statuses)[number])) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }
  const { id } = await params;
  const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
  if (error) return NextResponse.json({ error: "Could not update booking" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
