This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Booking Email Setup

Bookings are sent from the server to the admin email through Brevo SMTP. Copy `.env.example` to `.env.local` and set these values:

```env
BREVO_SMTP_USER=your-brevo-smtp-login
BREVO_SMTP_PASSWORD=your-brevo-smtp-key
BREVO_FROM_EMAIL=verified-sender@example.com
ADMIN_EMAIL=admin@example.com
```

In Brevo, use the SMTP relay credentials from **Transactional > Settings > Your SMTP & API Settings**. `BREVO_FROM_EMAIL` must be a verified sender or domain in Brevo. Keep `.env.local` private and never expose these values with `NEXT_PUBLIC_` variables.

## Admin Portal Setup

1. In Supabase, run `supabase/schema.sql` in the SQL Editor.
2. In **Authentication > Users**, create the staff user with email and password.
3. Add that email to `ADMIN_EMAILS` and set `SUPABASE_SERVICE_ROLE_KEY` from **Project Settings > API** in `.env.local`.
4. Open `/admin/login` to access the dashboard. Customers do not need accounts.

The service-role key is server-only. Never add it to a `NEXT_PUBLIC_` variable or browser code.

## Paystack Test Payments

Add `PAYSTACK_SECRET_KEY=sk_test_...` and `PAYSTACK_CURRENCY=NGN` to `.env.local`. The customer is redirected to Paystack after completing the booking form. The server verifies the transaction before saving the booking as `paid` and notifying the admin. The default test amounts are stored in `lib/paystack.ts` in the currency's smallest unit and can be changed later.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
