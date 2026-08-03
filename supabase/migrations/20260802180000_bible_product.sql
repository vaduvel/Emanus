-- Biblia explicata: continut public, memorie personala si inbox pastoral.
-- Continutul editorial se scrie numai cu o cheie server-side. Browserul poate
-- citi exclusiv capitole aprobate, iar datele personale sunt izolate prin RLS.

create table if not exists public.bible_books (
  id text primary key,
  name text not null,
  testament text not null check (testament in ('vt', 'nt')),
  book_order integer not null check (book_order > 0),
  blurb text not null default '',
  translation text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.bible_chapters (
  id text primary key,
  book_id text not null references public.bible_books (id) on delete cascade,
  chapter_number integer not null check (chapter_number > 0),
  title text not null,
  summary text not null,
  literary_context text not null,
  historical_context text not null,
  prayer text not null,
  status text not null check (status in ('draft', 'in_review', 'published')),
  updated_at timestamptz not null default now(),
  unique (book_id, chapter_number)
);

create table if not exists public.bible_units (
  id text primary key,
  chapter_id text not null references public.bible_chapters (id) on delete cascade,
  unit_order integer not null check (unit_order >= 0),
  ref text not null,
  heading text not null,
  bible_text text not null,
  teaching text not null,
  words jsonb not null default '[]'::jsonb check (jsonb_typeof(words) = 'array'),
  cross_refs text[] not null default '{}',
  for_your_heart text,
  search_text text not null default '',
  updated_at timestamptz not null default now(),
  unique (chapter_id, unit_order)
);

create index if not exists bible_chapters_book_order_idx
  on public.bible_chapters (book_id, chapter_number);
create index if not exists bible_units_chapter_order_idx
  on public.bible_units (chapter_id, unit_order);

-- Un singur punct de reluare per utilizator. Titlurile sunt instantanee pentru
-- ca ecranul sa ramana util offline sau daca un capitol intra din nou in revizie.
create table if not exists public.bible_reading_progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  book_id text not null,
  book_name text not null,
  chapter_number integer not null check (chapter_number > 0),
  chapter_title text not null,
  unit_id text,
  updated_at timestamptz not null
);

-- is_saved=false este un tombstone. Fara el, o salvare stearsa offline ar
-- reaparea la urmatoarea impacare cu un dispozitiv mai vechi.
create table if not exists public.bible_saved_units (
  user_id uuid not null references auth.users (id) on delete cascade,
  unit_id text not null,
  book_id text not null,
  book_name text not null,
  chapter_number integer not null check (chapter_number > 0),
  ref text not null,
  heading text not null,
  is_saved boolean not null default true,
  updated_at timestamptz not null,
  primary key (user_id, unit_id)
);

create table if not exists public.bible_notes (
  id uuid primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  unit_id text not null,
  book_id text not null,
  book_name text not null,
  chapter_number integer not null check (chapter_number > 0),
  ref text not null,
  heading text not null,
  body text not null check (char_length(body) between 1 and 10000),
  created_at timestamptz not null,
  updated_at timestamptz not null,
  deleted_at timestamptz
);

create table if not exists public.app_roles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role text not null check (role in ('pastoral', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.bible_questions (
  id uuid primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  question text not null check (char_length(question) between 1 and 10000),
  source_ref text,
  book_id text,
  chapter_number integer check (chapter_number is null or chapter_number > 0),
  unit_id text,
  status text not null default 'queued'
    check (status in ('queued', 'in_review', 'answered', 'closed')),
  answer text check (answer is null or char_length(answer) <= 20000),
  answered_at timestamptz,
  answered_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null,
  updated_at timestamptz not null
);

create index if not exists bible_saved_units_user_updated_idx
  on public.bible_saved_units (user_id, updated_at desc);
create index if not exists bible_notes_user_updated_idx
  on public.bible_notes (user_id, updated_at desc);
create index if not exists bible_questions_user_created_idx
  on public.bible_questions (user_id, created_at desc);
create index if not exists bible_questions_inbox_idx
  on public.bible_questions (status, created_at)
  where status in ('queued', 'in_review');

alter table public.bible_books enable row level security;
alter table public.bible_chapters enable row level security;
alter table public.bible_units enable row level security;
alter table public.bible_reading_progress enable row level security;
alter table public.bible_saved_units enable row level security;
alter table public.bible_notes enable row level security;
alter table public.app_roles enable row level security;
alter table public.bible_questions enable row level security;

drop policy if exists bible_books_published_read on public.bible_books;
create policy bible_books_published_read on public.bible_books
  for select using (
    exists (
      select 1 from public.bible_chapters c
      where c.book_id = bible_books.id and c.status = 'published'
    )
  );

drop policy if exists bible_chapters_published_read on public.bible_chapters;
create policy bible_chapters_published_read on public.bible_chapters
  for select using (status = 'published');

drop policy if exists bible_units_published_read on public.bible_units;
create policy bible_units_published_read on public.bible_units
  for select using (
    exists (
      select 1 from public.bible_chapters c
      where c.id = bible_units.chapter_id and c.status = 'published'
    )
  );

drop policy if exists bible_reading_progress_own on public.bible_reading_progress;
create policy bible_reading_progress_own on public.bible_reading_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists bible_saved_units_own on public.bible_saved_units;
create policy bible_saved_units_own on public.bible_saved_units
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists bible_notes_own on public.bible_notes;
create policy bible_notes_own on public.bible_notes
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists app_roles_own_read on public.app_roles;
create policy app_roles_own_read on public.app_roles
  for select using (auth.uid() = user_id);

create or replace function public.is_pastoral_staff()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1 from public.app_roles
    where user_id = auth.uid() and role in ('pastoral', 'admin')
  );
$$;

revoke all on function public.is_pastoral_staff() from public;
grant execute on function public.is_pastoral_staff() to authenticated;

drop policy if exists bible_questions_own_or_staff_read on public.bible_questions;
create policy bible_questions_own_or_staff_read on public.bible_questions
  for select using (auth.uid() = user_id or public.is_pastoral_staff());

drop policy if exists bible_questions_own_insert on public.bible_questions;
create policy bible_questions_own_insert on public.bible_questions
  for insert with check (
    auth.uid() = user_id
    and status = 'queued'
    and answer is null
    and answered_at is null
    and answered_by is null
  );

-- Cautarea ruleaza cu drepturile apelantului, deci RLS continua sa ascunda
-- drafturile si capitolele in revizie.
create or replace function public.search_bible_content(
  p_query text,
  p_limit integer default 20
)
returns table (
  unit_id text,
  book_id text,
  book_name text,
  chapter_number integer,
  ref text,
  heading text,
  excerpt text
)
language sql
stable
security invoker
set search_path = public, pg_temp
as $$
  select
    u.id,
    c.book_id,
    b.name,
    c.chapter_number,
    u.ref,
    u.heading,
    left(u.teaching, 220)
  from public.bible_units u
  join public.bible_chapters c on c.id = u.chapter_id
  join public.bible_books b on b.id = c.book_id
  where c.status = 'published'
    and length(trim(coalesce(p_query, ''))) >= 2
    and u.search_text like '%' || lower(trim(p_query)) || '%'
  order by b.book_order, c.chapter_number, u.unit_order
  limit least(greatest(coalesce(p_limit, 20), 1), 50);
$$;

-- Personalul pastoral nu primeste UPDATE direct pe tabel. Singura cale este
-- aceasta functie, care valideaza rolul, starea si continutul raspunsului.
create or replace function public.answer_bible_question(
  p_question_id uuid,
  p_status text,
  p_answer text default null
)
returns setof public.bible_questions
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if not public.is_pastoral_staff() then
    raise exception 'not authorized' using errcode = '42501';
  end if;

  if p_status not in ('in_review', 'answered', 'closed') then
    raise exception 'invalid status' using errcode = '22023';
  end if;

  if p_status = 'answered' and length(trim(coalesce(p_answer, ''))) = 0 then
    raise exception 'answer required' using errcode = '22023';
  end if;

  if char_length(coalesce(p_answer, '')) > 20000 then
    raise exception 'answer too long' using errcode = '22001';
  end if;

  return query
  update public.bible_questions
  set status = p_status,
      answer = case when p_status = 'answered' then trim(p_answer) else answer end,
      answered_at = case when p_status = 'answered' then now() else answered_at end,
      answered_by = case when p_status = 'answered' then auth.uid() else answered_by end,
      updated_at = now()
  where id = p_question_id
  returning *;
end;
$$;

revoke all on function public.search_bible_content(text, integer) from public;
grant execute on function public.search_bible_content(text, integer) to anon, authenticated;
revoke all on function public.answer_bible_question(uuid, text, text) from public;
grant execute on function public.answer_bible_question(uuid, text, text) to authenticated;

revoke all on public.bible_books, public.bible_chapters, public.bible_units from anon, authenticated;
revoke all on public.bible_reading_progress, public.bible_saved_units, public.bible_notes from anon, authenticated;
revoke all on public.app_roles, public.bible_questions from anon, authenticated;

grant select on public.bible_books, public.bible_chapters, public.bible_units to anon, authenticated;
grant select, insert, update on public.bible_reading_progress to authenticated;
grant select, insert, update on public.bible_saved_units to authenticated;
grant select, insert, update on public.bible_notes to authenticated;
grant select on public.app_roles to authenticated;
grant select, insert on public.bible_questions to authenticated;

grant all on public.bible_books, public.bible_chapters, public.bible_units to service_role;
grant all on public.bible_reading_progress, public.bible_saved_units, public.bible_notes to service_role;
grant all on public.app_roles, public.bible_questions to service_role;
