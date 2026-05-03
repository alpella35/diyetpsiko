# DZY Web Sitesi

Bu proje React + Vite + Tailwind ile hazırlanmıştır.

## Kurulum

```bash
npm install
npm run dev
```

## Vercel + Supabase Environment Variables

Vercel'de **Project Settings → Environment Variables** bölümüne aşağıdaki anahtarları ekleyin:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `VITE_ADMIN`
- `VITE_PASS`

## Supabase tabloları

```sql
create table if not exists contact_messages (
  id bigint generated always as identity primary key,
  full_name text not null,
  age_job text not null,
  email text not null,
  service_preference text,
  message text not null,
  created_at timestamptz default now()
);

create table if not exists chat_messages (
  id bigint generated always as identity primary key,
  message text not null,
  sender text not null,
  created_at timestamptz default now()
);
```


SQL dosyası: `supabase/schema.sql`
