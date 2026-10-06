create table if not exists public.assignment3_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null,
  role text not null default 'user' check (role in ('user', 'admin'))
);
create table if not exists public.assignment3_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null check (length(trim(title)) > 0),
  description text not null check (length(trim(description)) > 0),
  technologies text[] not null default '{}',
  link text not null default '',
  "createdAt" timestamptz not null default now()
);
create table if not exists public.assignment3_education (
  id uuid primary key default gen_random_uuid(),
  school text not null check (length(trim(school)) > 0),
  degree text not null check (length(trim(degree)) > 0),
  field text not null check (length(trim(field)) > 0),
  "startDate" text not null default '',
  "endDate" text not null default '',
  description text not null default '',
  "createdAt" timestamptz not null default now()
);
create table if not exists public.assignment3_contacts (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (length(trim(name)) > 0),
  email text not null,
  message text not null check (length(trim(message)) > 0),
  "createdAt" timestamptz not null default now()
);
create index if not exists assignment3_contacts_owner_idx on public.assignment3_contacts(owner_id);
create table if not exists public.assignment3_revoked_sessions (
  token_hash text primary key,
  owner_id uuid not null references auth.users(id) on delete cascade,
  expires_at timestamptz not null
);
create index if not exists assignment3_revoked_owner_idx on public.assignment3_revoked_sessions(owner_id);
alter table public.assignment3_profiles enable row level security;
alter table public.assignment3_projects enable row level security;
alter table public.assignment3_education enable row level security;
alter table public.assignment3_contacts enable row level security;
alter table public.assignment3_revoked_sessions enable row level security;
revoke all on public.assignment3_profiles, public.assignment3_contacts, public.assignment3_revoked_sessions from anon;
grant select, insert on public.assignment3_profiles to authenticated;
grant update (name) on public.assignment3_profiles to authenticated;
grant select on public.assignment3_projects, public.assignment3_education to anon, authenticated;
grant insert, update, delete on public.assignment3_projects, public.assignment3_education to authenticated;
grant select, insert, update, delete on public.assignment3_contacts to authenticated;
grant select, insert on public.assignment3_revoked_sessions to authenticated;
create policy assignment3_profile_read on public.assignment3_profiles for select to authenticated using (id = (select auth.uid()));
create policy assignment3_profile_insert on public.assignment3_profiles for insert to authenticated with check (id = (select auth.uid()) and role = 'user');
create policy assignment3_profile_update on public.assignment3_profiles for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()) and role = 'user');
create policy assignment3_projects_read on public.assignment3_projects for select to anon, authenticated using (true);
create policy assignment3_projects_admin on public.assignment3_projects for all to authenticated
using (exists (select 1 from public.assignment3_profiles where id = (select auth.uid()) and role = 'admin'))
with check (exists (select 1 from public.assignment3_profiles where id = (select auth.uid()) and role = 'admin'));
create policy assignment3_education_read on public.assignment3_education for select to anon, authenticated using (true);
create policy assignment3_education_admin on public.assignment3_education for all to authenticated
using (exists (select 1 from public.assignment3_profiles where id = (select auth.uid()) and role = 'admin'))
with check (exists (select 1 from public.assignment3_profiles where id = (select auth.uid()) and role = 'admin'));
create policy assignment3_contacts_read on public.assignment3_contacts for select to authenticated
using (owner_id = (select auth.uid()) or exists (select 1 from public.assignment3_profiles where id = (select auth.uid()) and role = 'admin'));
create policy assignment3_contacts_insert on public.assignment3_contacts for insert to authenticated with check (owner_id = (select auth.uid()));
create policy assignment3_contacts_update on public.assignment3_contacts for update to authenticated
using (exists (select 1 from public.assignment3_profiles where id = (select auth.uid()) and role = 'admin'))
with check (exists (select 1 from public.assignment3_profiles where id = (select auth.uid()) and role = 'admin'));
create policy assignment3_contacts_delete on public.assignment3_contacts for delete to authenticated
using (exists (select 1 from public.assignment3_profiles where id = (select auth.uid()) and role = 'admin'));
create policy assignment3_session_read on public.assignment3_revoked_sessions for select to authenticated using (owner_id = (select auth.uid()));
create policy assignment3_session_insert on public.assignment3_revoked_sessions for insert to authenticated with check (owner_id = (select auth.uid()));
notify pgrst, 'reload schema';
