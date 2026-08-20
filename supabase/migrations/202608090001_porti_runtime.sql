-- Păstrează identitatea ușii și progresul stabil între dispozitive.
-- Migrarea este idempotentă și poate fi aplicată peste orice instalare Emanus.
alter table public.journey add column if not exists door_id text;
alter table public.journey add column if not exists completed_doctrine_lesson_ids jsonb not null default '[]'::jsonb;
alter table public.journey add column if not exists completed_lesson_ids jsonb not null default '[]'::jsonb;
alter table public.journey add column if not exists emmaus_max_station integer not null default 1;
alter table public.journey add column if not exists emmaus_station_seen_at jsonb not null default '{}'::jsonb;
alter table public.journey add column if not exists cross_visited_at date;
alter table public.journey add column if not exists schema_version integer not null default 2;

update public.journey
set
  completed_doctrine_lesson_ids = coalesce(completed_doctrine_lesson_ids, '[]'::jsonb),
  completed_lesson_ids = coalesce(completed_lesson_ids, '[]'::jsonb),
  emmaus_station_seen_at = coalesce(emmaus_station_seen_at, '{}'::jsonb),
  schema_version = greatest(coalesce(schema_version, 1), 2);
