"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function BookingActions({ bookingId, email, status: initialStatus }: { bookingId: string; email: string; status: string }) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  async function updateStatus(nextStatus: string) {
    setStatus(nextStatus);
    await fetch(`/api/admin/bookings/${bookingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });
    router.refresh();
  }

  async function sendEmail() {
    if (!message.trim()) return;
    setSending(true);
    setNotice(null);
    const response = await fetch(`/api/admin/bookings/${bookingId}/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    setNotice(response.ok ? "Email sent" : "Email failed");
    setSending(false);
    if (response.ok) setMessage("");
  }

  return (
    <div className="mt-4 border-t border-border pt-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor={`status-${bookingId}`}>Status</label>
        <select id={`status-${bookingId}`} value={status} onChange={(event) => updateStatus(event.target.value)} className="rounded-md border border-border bg-background px-2 py-1 text-sm text-foreground">
          <option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option>
        </select>
        <span className="text-xs text-muted-foreground">Reply to {email}</span>
      </div>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Write a follow-up message..." className="input h-10 flex-1" />
        <button onClick={sendEmail} disabled={sending || !message.trim()} className="btn btn-primary h-10 px-4">{sending ? "Sending..." : "Send email"}</button>
      </div>
      {notice && <p className="mt-2 text-xs text-muted-foreground">{notice}</p>}
    </div>
  );
}
