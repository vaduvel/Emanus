-- Păstrează propoziția prin care omul a intrat, pentru ramura editorială inițială.
-- Nu este diagnostic și nu include text liber scris de utilizator.
alter table public.journey
  add column if not exists selected_door_id text;
