-- Conținutul public Emanus: manifest atomic + lecții încărcate individual.
-- Scrierea este permisă exclusiv prin service_role; anon/authenticated pot citi
-- numai release-ul activ și lecțiile publicate.

create table if not exists public.content_manifests (
  version text primary key,
  schema_version integer not null check (schema_version = 1),
  payload jsonb not null,
  is_active boolean not null default false,
  published_at timestamptz not null default now()
);

create unique index if not exists content_manifests_one_active_idx
  on public.content_manifests (is_active)
  where is_active;

create table if not exists public.content_lessons (
  id text not null,
  content_version text not null,
  course_id text not null,
  sort_order integer not null check (sort_order > 0),
  title text not null,
  est_minutes integer not null check (est_minutes > 0),
  anchor_refs text[] not null default '{}',
  memory_verse_ref text not null,
  badge_id text,
  safety jsonb,
  steps jsonb not null check (jsonb_typeof(steps) = 'array'),
  status text not null default 'draft'
    check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (content_version, id)
);

alter table public.content_lessons
  add column if not exists safety jsonb;

create index if not exists content_lessons_status_idx
  on public.content_lessons (status, content_version, id);

alter table public.content_manifests enable row level security;
alter table public.content_lessons enable row level security;

drop policy if exists content_manifests_public_read on public.content_manifests;
create policy content_manifests_public_read
  on public.content_manifests
  for select
  to anon, authenticated
  using (is_active);

drop policy if exists content_lessons_public_read on public.content_lessons;
create policy content_lessons_public_read
  on public.content_lessons
  for select
  to anon, authenticated
  using (status = 'published');

revoke all on public.content_manifests from anon, authenticated;
revoke all on public.content_lessons from anon, authenticated;
grant select on public.content_manifests to anon, authenticated;
grant select on public.content_lessons to anon, authenticated;

create or replace function public.publish_content_release(
  release_version text,
  release_payload jsonb,
  release_lessons jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  lesson_count integer;
begin
  if release_version is null or length(release_version) < 8 then
    raise exception 'invalid release version';
  end if;
  if release_payload ->> 'contentVersion' is distinct from release_version then
    raise exception 'manifest version does not match release version';
  end if;
  if (release_payload ->> 'schemaVersion')::integer is distinct from 1 then
    raise exception 'unsupported manifest schema version';
  end if;
  if jsonb_typeof(release_lessons) is distinct from 'array' then
    raise exception 'release_lessons must be an array';
  end if;

  insert into public.content_lessons (
    id,
    course_id,
    sort_order,
    title,
    est_minutes,
    anchor_refs,
    memory_verse_ref,
    badge_id,
    safety,
    steps,
    status,
    content_version,
    published_at,
    updated_at
  )
  select
    lesson.id,
    lesson.course_id,
    lesson.sort_order,
    lesson.title,
    lesson.est_minutes,
    lesson.anchor_refs,
    lesson.memory_verse_ref,
    lesson.badge_id,
    lesson.safety,
    lesson.steps,
    'published',
    release_version,
    now(),
    now()
  from jsonb_to_recordset(release_lessons) as lesson(
    id text,
    course_id text,
    sort_order integer,
    title text,
    est_minutes integer,
    anchor_refs text[],
    memory_verse_ref text,
    badge_id text,
    safety jsonb,
    steps jsonb
  )
  on conflict (content_version, id) do update set
    course_id = excluded.course_id,
    sort_order = excluded.sort_order,
    title = excluded.title,
    est_minutes = excluded.est_minutes,
    anchor_refs = excluded.anchor_refs,
    memory_verse_ref = excluded.memory_verse_ref,
    badge_id = excluded.badge_id,
    safety = excluded.safety,
    steps = excluded.steps,
    status = 'published',
    content_version = excluded.content_version,
    published_at = excluded.published_at,
    updated_at = excluded.updated_at;

  get diagnostics lesson_count = row_count;

  update public.content_manifests set is_active = false where is_active;
  insert into public.content_manifests (
    version,
    schema_version,
    payload,
    is_active,
    published_at
  )
  values (release_version, 1, release_payload, true, now())
  on conflict (version) do update set
    schema_version = excluded.schema_version,
    payload = excluded.payload,
    is_active = true,
    published_at = excluded.published_at;

  return jsonb_build_object(
    'version', release_version,
    'lessons', lesson_count
  );
end;
$$;

revoke all on function public.publish_content_release(text, jsonb, jsonb)
  from public, anon, authenticated;
grant execute on function public.publish_content_release(text, jsonb, jsonb)
  to service_role;
