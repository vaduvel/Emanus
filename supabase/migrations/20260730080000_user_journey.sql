-- Starea privată a omului. Supabase Auth anonim furnizează user_id, iar RLS
-- garantează că niciun client nu poate citi sau modifica datele altcuiva.

create table if not exists public.journey (
  user_id uuid primary key references auth.users (id) on delete cascade,
  seen_welcome boolean not null default false,
  path_id text,
  lessons_done integer not null default 0 check (lessons_done >= 0),
  doctrine_done integer not null default 0 check (doctrine_done >= 0),
  last_lesson_date date,
  prayer_invite_seen boolean not null default false,
  path_completed_seen boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists public.journal (
  user_id uuid not null references auth.users (id) on delete cascade,
  lesson_id text not null,
  text text not null check (length(text) <= 10000),
  entry_date date not null default current_date,
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

create table if not exists public.prayers (
  id text not null,
  user_id uuid not null references auth.users (id) on delete cascade,
  text text not null check (length(text) <= 5000),
  created_date date not null default current_date,
  answered_date date,
  answer_note text check (answer_note is null or length(answer_note) <= 5000),
  primary key (user_id, id)
);

create index if not exists journal_user_date_idx
  on public.journal (user_id, entry_date);

create index if not exists prayers_user_open_idx
  on public.prayers (user_id, created_date)
  where answered_date is null;

alter table public.journey enable row level security;
alter table public.journal enable row level security;
alter table public.prayers enable row level security;

drop policy if exists journey_own on public.journey;
create policy journey_own
  on public.journey
  for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists journal_own on public.journal;
create policy journal_own
  on public.journal
  for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists prayers_own on public.prayers;
create policy prayers_own
  on public.prayers
  for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

revoke all on public.journey from anon;
revoke all on public.journal from anon;
revoke all on public.prayers from anon;
grant select, insert, update, delete on public.journey to authenticated;
grant select, insert, update, delete on public.journal to authenticated;
grant select, insert, update, delete on public.prayers to authenticated;
