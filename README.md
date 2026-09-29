# ShareMe — официальный сайт

Белый лендинг ShareMe (не мессенджер).

## Запуск

```bash
cd shareme-web
npm install
npm run dev
```

Откроется http://localhost:5174

## Логотип

Положи файл в:

```
public/logo.jpg
```

## Таймер запуска (Supabase)

Таблица (SQL в Supabase):

```sql
create table if not exists shareme_launch (
  id int primary key default 1,
  launch_at timestamptz not null
);

insert into shareme_launch (id, launch_at)
values (1, now() + interval '24 days')
on conflict (id) do nothing;

create table if not exists shareme_news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  created_at timestamptz default now()
);

-- для anon: SELECT на launch и news; INSERT news только если настроите RLS/политику
```

Или в `.env`:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_LAUNCH_AT=2026-10-23T12:00:00.000Z
VITE_APP_URL=http://localhost:5173
```

Если Supabase недоступен — таймер 24 дня от первого визита (localStorage).

## Админ новостей

Раздел **Модерация** → невидимая точка справа сверху блока → логин:

- username: `sharemeadmin`
- password: `sharemeadmin`

Смени пароль в `src/pages/Moderation.tsx` перед продом.
