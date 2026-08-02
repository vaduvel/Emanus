# Biblia cloud: operare si securitate

## Ce este sursa de adevar

- Continut editorial: `packages/shared/src/bible/`.
- Schema versionata: `supabase/migrations/20260802180000_bible_product.sql`.
- Schema consolidata pentru un proiect gol: `supabase/schema.sql`.
- Browserul citeste catalogul si cate un capitol din Supabase. Nu importa cartile in bundle.
- IndexedDB este cache offline, nu sursa editoriala.
- Progresul, salvarile, notitele si intrebarile sunt offline-first si se impaca dupa `updated_at`.

## Prima instalare Supabase

1. In Authentication > Providers, activeaza Anonymous Sign-Ins si Email OTP.
2. Ruleaza `supabase/schema.sql` in SQL Editor pentru un proiect gol.
3. Pentru un proiect deja initializat, aplica numai migrarile noi in ordine.
4. Pune in `.env` `SUPABASE_URL` si `SUPABASE_SECRET_KEY` numai pe masina/serverul de administrare.
5. Ruleaza `pnpm sync:bible-content`.
6. Verifica folosind cheia publica: capitolele `draft` si `in_review` trebuie sa intoarca zero randuri.

Scriptul incarca toate versiunile editoriale, dar RLS expune public numai `status = 'published'`.
Schimbarea statusului ramane o decizie umana si este blocata de registrele editoriale din CI.

## Rol pastoral

Rolurile nu se acorda din browser. Un administrator ruleaza in SQL Editor:

```sql
insert into public.app_roles (user_id, role)
values ('UUID-UL-UTILIZATORULUI', 'pastoral')
on conflict (user_id) do update set role = excluded.role;
```

Personalul vede inboxul din `#/biblia-mea`. Nu are `UPDATE` direct pe intrebari;
raspunsul trece prin `answer_bible_question`, care verifica rolul si starea.

## Date intime si RLS

- `bible_reading_progress`, `bible_saved_units`, `bible_notes`: numai proprietarul.
- `bible_questions`: proprietarul si personalul pastoral autorizat pot citi.
- Numai proprietarul poate introduce o intrebare si numai cu starea `queued`.
- Notitele se sterg logic (`deleted_at`), astfel incat sa nu reapara de pe alt dispozitiv.
- Salvarile folosesc `is_saved=false` ca tombstone din acelasi motiv.
- La deconectare, copiile locale ale notitelor, intrebarilor, jurnalului si rugaciunilor sunt golite; datele sincronizate raman numai in cont.
- Cheia `SUPABASE_SECRET_KEY` nu este niciodata `VITE_*` si nu apare in `apps/web/src`.

## Verificari

```sh
pnpm check:bible-source
pnpm check:bible-cloud
pnpm typecheck
pnpm build
pnpm check:bible-bundle
```

`check:bible-bundle` esueaza daca textul editorial sau un chunk `bible-content`
ajunge din nou in PWA.
