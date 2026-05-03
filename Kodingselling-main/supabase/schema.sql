-- Run this in Supabase SQL Editor

create table if not exists public.contact_messages (
  id bigint generated always as identity primary key,
  full_name text not null,
  age_job text not null,
  email text,
  phone text not null,
  service_preference text,
  message text not null,
  created_at timestamptz default now()
);

alter table public.contact_messages add column if not exists phone text;
alter table public.contact_messages alter column phone set not null;
alter table public.contact_messages alter column email drop not null;

create table if not exists public.chat_messages (
  id bigint generated always as identity primary key,
  message text not null,
  sender text not null,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.contact_messages enable row level security;
alter table public.chat_messages enable row level security;

-- Allow anonymous inserts (for website form/chat)
drop policy if exists "anon_insert_contact" on public.contact_messages;
create policy "anon_insert_contact"
on public.contact_messages
for insert
to anon
with check (true);

drop policy if exists "anon_insert_chat" on public.chat_messages;
create policy "anon_insert_chat"
on public.chat_messages
for insert
to anon
with check (true);

-- Allow frontend admin page reads with anon key (access is gated in UI by VITE_ADMIN/VITE_PASS)
drop policy if exists "anon_select_contact" on public.contact_messages;
create policy "anon_select_contact"
on public.contact_messages
for select
to anon
using (true);

drop policy if exists "anon_select_chat" on public.chat_messages;
create policy "anon_select_chat"
on public.chat_messages
for select
to anon
using (true);
