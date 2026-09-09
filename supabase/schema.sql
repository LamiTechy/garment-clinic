create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  service text not null,
  date date not null,
  time text not null,
  notes text not null default '',
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid', 'pending', 'paid', 'failed', 'refunded')),
  payment_reference text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index bookings_created_at_idx on public.bookings (created_at desc);
create index bookings_date_idx on public.bookings (date);

alter table public.bookings enable row level security;

create policy "Admins can view bookings"
  on public.bookings for select
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Public can create bookings"
  on public.bookings for insert
  to anon, authenticated
  with check (true);

create policy "Admins can update bookings"
  on public.bookings for update
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger bookings_updated_at
before update on public.bookings
for each row execute procedure public.set_updated_at();
