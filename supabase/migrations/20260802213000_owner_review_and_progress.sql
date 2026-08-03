-- Proprietarul Emanus este reviewerul uman final.
-- Publicul vede numai `published`; utilizatorul cu rol `admin` vede și
-- `in_review` în aplicație, exact la locul lui, înainte de lansare.

alter table public.journey
  add column if not exists path_progress jsonb not null default '{}'::jsonb,
  add column if not exists library_done text[] not null default '{}';

alter table public.journal
  add column if not exists context_id text;

create or replace function public.is_editorial_reviewer()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1
    from public.app_roles
    where user_id = auth.uid() and role = 'admin'
  );
$$;

revoke all on function public.is_editorial_reviewer() from public;
grant execute on function public.is_editorial_reviewer() to anon, authenticated;

drop policy if exists bible_books_published_read on public.bible_books;
drop policy if exists bible_books_visible_read on public.bible_books;
create policy bible_books_visible_read on public.bible_books
  for select using (
    exists (
      select 1
      from public.bible_chapters chapter
      where chapter.book_id = bible_books.id
        and (
          chapter.status = 'published'
          or (chapter.status = 'in_review' and public.is_editorial_reviewer())
        )
    )
  );

drop policy if exists bible_chapters_published_read on public.bible_chapters;
drop policy if exists bible_chapters_visible_read on public.bible_chapters;
create policy bible_chapters_visible_read on public.bible_chapters
  for select using (
    status = 'published'
    or (status = 'in_review' and public.is_editorial_reviewer())
  );

drop policy if exists bible_units_published_read on public.bible_units;
drop policy if exists bible_units_visible_read on public.bible_units;
create policy bible_units_visible_read on public.bible_units
  for select using (
    exists (
      select 1
      from public.bible_chapters chapter
      where chapter.id = bible_units.chapter_id
        and (
          chapter.status = 'published'
          or (chapter.status = 'in_review' and public.is_editorial_reviewer())
        )
    )
  );

-- Căutarea urmează aceeași regulă: publicat pentru toți, în revizie numai
-- pentru contul admin al proprietarului. Draftul nu este afișat nimănui.
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
    unit.id,
    chapter.book_id,
    book.name,
    chapter.chapter_number,
    unit.ref,
    unit.heading,
    left(unit.teaching, 220)
  from public.bible_units unit
  join public.bible_chapters chapter on chapter.id = unit.chapter_id
  join public.bible_books book on book.id = chapter.book_id
  where (
      chapter.status = 'published'
      or (chapter.status = 'in_review' and public.is_editorial_reviewer())
    )
    and length(trim(coalesce(p_query, ''))) >= 2
    and unit.search_text like '%' || lower(trim(p_query)) || '%'
  order by book.book_order, chapter.chapter_number, unit.unit_order
  limit least(greatest(coalesce(p_limit, 20), 1), 50);
$$;

revoke all on function public.search_bible_content(text, integer) from public;
grant execute on function public.search_bible_content(text, integer) to anon, authenticated;

-- După prima autentificare a proprietarului, rulează o singură dată în SQL
-- Editor, înlocuind UUID-ul:
-- insert into public.app_roles (user_id, role)
-- values ('UUID-UL-PROPRIETARULUI', 'admin')
-- on conflict (user_id) do update set role = excluded.role;
