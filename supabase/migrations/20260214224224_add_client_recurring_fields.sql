alter table public.clients
  add column if not exists is_recurring boolean not null default false,
  add column if not exists recurrence_frequency text check (recurrence_frequency in ('monthly', 'quarterly', 'custom')),
  add column if not exists recurrence_custom_days integer check (recurrence_custom_days > 0),
  add column if not exists recurrence_start_date date,
  add column if not exists recurrence_end_date date;
