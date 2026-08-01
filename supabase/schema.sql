-- Emanus — structura de date în Supabase.
-- De rulat o singură dată în Supabase Studio > SQL Editor.
--
-- PRINCIPII (docs/20 §1):
--  * Nu se salvează scoruri, serii de zile, nivele sau profil psihologic.
--  * Se salvează EXACT ce vede omul în aplicație: ce drum a ales, unde a ajuns,
--    ce a scris el cu mâna lui (jurnal și rugăciuni).
--  * Jurnalul și rugăciunile sunt cele mai intime lucruri din aplicație.
--    RLS separă utilizatorii. Backup-ul nu este criptat end-to-end, deci accesul
--    operațional cu service_role trebuie limitat și auditat.
--
-- AUTENTIFICARE: intrare anonimă (Supabase > Authentication > Providers >
-- Anonymous sign-ins = ON). Omul nu-și face cont și nu dă niciun e-mail.
-- Dacă vrea să-și mute drumul pe alt telefon, își leagă ulterior un e-mail
-- peste același cont anonim (linkIdentity), și datele rămân ale lui.

-- 1. Drumul: un singur rând per om.
create table if not exists public.journey (
  user_id uuid primary key references auth.users (id) on delete cascade,
  seen_welcome boolean not null default false,
  path_id text,
  lessons_done integer not null default 0,
  doctrine_done integer not null default 0,
  last_lesson_date date,
  prayer_invite_seen boolean not null default false,
  path_completed_seen boolean not null default false,
  course_progress jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- 2. Jurnalul: ce a scris în lecții. O intrare per lecție.
create table if not exists public.journal (
  user_id uuid not null references auth.users (id) on delete cascade,
  lesson_id text not null,
  text text not null,
  entry_date date not null default current_date,
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

-- 3. Rugăciunile și răspunsurile (memorialul, Eben-Ezer).
create table if not exists public.prayers (
  id text not null,
  user_id uuid not null references auth.users (id) on delete cascade,
  text text not null,
  created_date date not null default current_date,
  answered_date date,
  answer_note text,
  primary key (user_id, id)
);

create index if not exists prayers_user_open_idx
  on public.prayers (user_id, created_date)
  where answered_date is null;

-- RLS: fiecare vede și scrie doar ce e al lui.
alter table public.journey enable row level security;
alter table public.journal enable row level security;
alter table public.prayers enable row level security;

drop policy if exists journey_own on public.journey;
create policy journey_own on public.journey
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists journal_own on public.journal;
create policy journal_own on public.journal
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists prayers_own on public.prayers;
create policy prayers_own on public.prayers
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Utilizatorul își poate șterge propriul cont; cascadele elimină toate datele.
create or replace function public.delete_own_account()
returns void
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  caller_id uuid := auth.uid();
begin
  if caller_id is null then
    raise exception 'authentication required';
  end if;
  delete from auth.users where id = caller_id;
end;
$$;

revoke all on function public.delete_own_account() from public, anon;
grant execute on function public.delete_own_account() to authenticated;
