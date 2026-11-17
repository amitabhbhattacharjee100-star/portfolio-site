create table if not exists public.assignment4_contact_messages (
  id uuid primary key default gen_random_uuid(),
  first_name text not null check (length(trim(first_name)) between 1 and 80),
  last_name text not null check (length(trim(last_name)) between 1 and 80),
  contact_number text not null check (length(trim(contact_number)) between 1 and 30),
  email text not null check (length(trim(email)) between 3 and 254),
  message text not null check (length(trim(message)) between 5 and 5000),
  source text not null default 'portfolio-contact-form',
  created_at timestamptz not null default now()
);
alter table public.assignment4_contact_messages enable row level security;
revoke all on public.assignment4_contact_messages from anon, authenticated;
grant insert on public.assignment4_contact_messages to anon, authenticated;
drop policy if exists assignment4_contact_insert on public.assignment4_contact_messages;
create policy assignment4_contact_insert on public.assignment4_contact_messages
for insert to anon, authenticated
with check (
  length(trim(first_name)) between 1 and 80
  and length(trim(last_name)) between 1 and 80
  and length(trim(contact_number)) between 1 and 30
  and length(trim(email)) between 3 and 254
  and length(trim(message)) between 5 and 5000
);
notify pgrst, 'reload schema';