# DZY Web Sitesi

Bu proje React + Vite + Tailwind ile hazırlanmıştır.

## Kurulum

```bash
npm install
npm run dev
```

## Vercel + Supabase Environment Variables

Vercel'de **Project Settings → Environment Variables** bölümüne aşağıdaki anahtarları ekleyin.
Bu projede hem `VITE_*` hem `NEXT_PUBLIC_*` prefix'leri desteklenir:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
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
  email text,
  phone text not null,
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
Not: Önceki policy'leri güncellemek için bu SQL'i tekrar çalıştırın.

## Ek SQL (email opsiyonel + telefon zorunlu dönüşümü)

```sql
alter table public.contact_messages add column if not exists phone text;
alter table public.contact_messages alter column phone set not null;
alter table public.contact_messages alter column email drop not null;
```
