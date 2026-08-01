-- Progresul cursurilor face parte din backup, răspunsurile interactive nu.
alter table public.journey
  add column if not exists course_progress jsonb not null default '{}'::jsonb;

-- Ștergerea pornită de utilizator elimină și identitatea anonimă/legată.
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
