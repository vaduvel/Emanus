-- Utilizatorul autentificat își poate șterge numai propria identitate.
-- Cascadele FK din public.journey, public.journal și public.prayers elimină datele.
create or replace function public.delete_own_account()
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  caller_id uuid;
begin
  caller_id := (select auth.uid());
  if caller_id is null then
    raise exception 'authentication required' using errcode = '42501';
  end if;

  delete from auth.users
  where id = caller_id;

  if not found then
    raise exception 'account not found' using errcode = 'P0002';
  end if;
end;
$$;

-- Funcțiile primesc EXECUTE pentru PUBLIC implicit; îl închidem înainte de grant.
revoke all on function public.delete_own_account() from public;
revoke all on function public.delete_own_account() from anon;
grant execute on function public.delete_own_account() to authenticated;
