import { redirect } from "next/navigation";
import { CalendarDays, CheckCircle2, Clock3, Mail, UserRound } from "lucide-react";
import { getAdminUser } from "@/lib/admin-auth";
import { BookingActions } from "@/components/admin/booking-actions";

export const dynamic = "force-dynamic";

type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes: string;
  status: string;
  payment_status: string;
  created_at: string;
};

export default async function AdminPage() {
  const { supabase, user } = await getAdminUser();
  if (!user) redirect("/admin/login?error=unauthorized");

  const { data, error } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
  const bookings = (data || []) as Booking[];
  const pendingCount = bookings.filter((booking) => booking.status === "pending").length;
  const confirmedCount = bookings.filter((booking) => booking.status === "confirmed").length;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Operations</p>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-foreground">Booking dashboard</h1>
          <p className="mt-2 text-muted-foreground">Review requests, update their status, and contact customers.</p>
        </div>
        <div className="flex gap-2 sm:gap-3 text-sm">
          <div className="rounded-lg border border-border bg-card-bg px-3 sm:px-4 py-2 sm:py-3"><span className="font-bold text-foreground">{pendingCount}</span> <span className="text-muted-foreground">pending</span></div>
          <div className="rounded-lg border border-border bg-card-bg px-3 sm:px-4 py-2 sm:py-3"><span className="font-bold text-foreground">{confirmedCount}</span> <span className="text-muted-foreground">confirmed</span></div>
        </div>
      </div>

      {error && <p className="mt-8 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">Could not load bookings. Run the SQL in `supabase/schema.sql` first.</p>}
      {!error && bookings.length === 0 && <div className="card mt-8 p-10 text-center"><CalendarDays className="mx-auto h-8 w-8 text-muted-foreground" /><p className="mt-3 font-semibold text-foreground">No bookings yet</p><p className="mt-1 text-sm text-muted-foreground">New customer requests will appear here.</p></div>}
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {bookings.map((booking) => (
          <article key={booking.id} className="card p-4 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div><h2 className="text-lg font-semibold text-foreground">{booking.name}</h2><p className="mt-1 text-sm text-muted-foreground">{booking.service}</p></div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold capitalize text-primary">{booking.status}</span>
            </div>
            <div className="mt-5 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              <p className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-primary" />{booking.date}</p>
              <p className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-primary" />{booking.time}</p>
              <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" />{booking.email}</p>
              <p className="flex items-center gap-2"><UserRound className="h-4 w-4 text-primary" />{booking.phone}</p>
            </div>
            {booking.notes && <p className="mt-4 rounded-lg bg-muted p-3 text-sm text-muted-foreground">{booking.notes}</p>}
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><CheckCircle2 className="h-4 w-4 text-primary" />Payment: <span className="capitalize">{booking.payment_status}</span></div>
            <BookingActions bookingId={booking.id} email={booking.email} status={booking.status} />
          </article>
        ))}
      </div>
    </main>
  );
}
