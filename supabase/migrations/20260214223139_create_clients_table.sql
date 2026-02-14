-- Create clients table for US01
create extension if not exists "pgcrypto";

create table if not exists public.clients (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    billing_address text,
    contact_name text,
    contact_email text,
    contact_phone text,
    currency char(3) not null default 'EUR',
    purchase_order_number text,
    created_at timestamptz not null default timezone('utc', now()),
    updated_at timestamptz not null default timezone('utc', now())
);

create unique index if not exists clients_name_unique_idx on public.clients (lower(name));

create or replace function public.set_clients_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$ language plpgsql;

create trigger trg_clients_updated_at
before update on public.clients
for each row execute function public.set_clients_updated_at();

alter table public.clients enable row level security;
-- policies will be added later when auth roles are defined.
