# @emanus/db

Postgres gestionat de **Supabase**, accesat prin **Prisma**.

## 1. Ia datele din Supabase
Dashboard Supabase -> **Project Settings -> Database -> Connection string**:
- **DATABASE_URL** = varianta *pooled* (Transaction, port **6543**) + `?pgbouncer=true&connection_limit=1`
- **DIRECT_URL** = varianta *direct* (port **5432**)

(Opțional, pentru Auth/Storage) **Project Settings -> API**: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.

## 2. Configurează local
```bash
cp .env.example .env   # în rădăcina repo-ului
# completează DATABASE_URL și DIRECT_URL cu valorile din Supabase
```
`.env` e în `.gitignore` — nu se comite.

## 3. Migrări și client
```bash
pnpm --filter @emanus/db generate         # generează Prisma Client
pnpm --filter @emanus/db migrate          # creează/aplică migrări (folosește DIRECT_URL)
```
După prima migrare, tabelele apar în Supabase (Table Editor).

## De ce două URL-uri?
Supabase pune un pooler (PgBouncer) pe 6543 pentru conexiuni de runtime (eficient, serverless-friendly). Migrările Prisma au nevoie de o conexiune directă (5432), de aceea `directUrl`.
