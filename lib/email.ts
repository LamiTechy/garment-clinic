type BookingEmailDetails = {
  name: string;
  email: string;
  phone?: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
  paymentReference?: string;
};

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    "\"": "&quot;",
  })[character] || character);
}

function detailRow(label: string, value: string) {
  return `<tr><td style="padding:10px 0;color:#64748b;font-size:13px;width:38%;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:10px 0;color:#172033;font-size:14px;font-weight:600;vertical-align:top;">${escapeHtml(value)}</td></tr>`;
}

export function bookingEmailHtml(details: BookingEmailDetails, heading: string, intro: string) {
  const rows = [
    detailRow("Customer", details.name),
    detailRow("Email", details.email),
    details.phone ? detailRow("Phone", details.phone) : "",
    detailRow("Service", details.service),
    detailRow("Date", details.date),
    detailRow("Time", details.time),
    details.paymentReference ? detailRow("Payment reference", details.paymentReference) : "",
    detailRow("Notes", details.notes || "None"),
  ].join("");

  return `<!doctype html><html><body style="margin:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#172033;"><div style="padding:32px 16px;"><table role="presentation" style="width:100%;max-width:620px;margin:0 auto;background:#ffffff;border-collapse:collapse;border-radius:14px;overflow:hidden;"><tr><td style="padding:26px 32px;background:#12233f;color:#ffffff;"><div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:700;color:#8ed1c7;">Ace Wash N Dry</div><div style="margin-top:8px;font-size:25px;font-weight:700;">${escapeHtml(heading)}</div></td></tr><tr><td style="padding:30px 32px;"><p style="margin:0 0 22px;font-size:15px;line-height:1.6;color:#475569;">${escapeHtml(intro)}</p><table role="presentation" style="width:100%;border-collapse:collapse;border-top:1px solid #e2e8f0;">${rows}</table></td></tr><tr><td style="padding:20px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;color:#64748b;font-size:12px;line-height:1.5;">Ace Wash N Dry<br>Professional laundry and dry-cleaning service</td></tr></table></div></body></html>`;
}

export function messageEmailHtml(name: string, message: string, service: string, date: string, time: string) {
  return `<!doctype html><html><body style="margin:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#172033;"><div style="padding:32px 16px;"><table role="presentation" style="width:100%;max-width:620px;margin:0 auto;background:#ffffff;border-collapse:collapse;border-radius:14px;overflow:hidden;"><tr><td style="padding:26px 32px;background:#12233f;color:#ffffff;"><div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:700;color:#8ed1c7;">Ace Wash N Dry</div><div style="margin-top:8px;font-size:25px;font-weight:700;">A message for ${escapeHtml(name)}</div></td></tr><tr><td style="padding:30px 32px;"><div style="font-size:15px;line-height:1.7;color:#334155;white-space:pre-wrap;">${escapeHtml(message)}</div><div style="margin-top:24px;padding:16px;background:#f8fafc;border-left:4px solid #2f8f83;font-size:13px;line-height:1.6;color:#475569;"><strong>Booking:</strong> ${escapeHtml(service)}<br><strong>Date:</strong> ${escapeHtml(date)}<br><strong>Time:</strong> ${escapeHtml(time)}</div></td></tr><tr><td style="padding:20px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;color:#64748b;font-size:12px;">Ace Wash N Dry</td></tr></table></div></body></html>`;
}
