-- ============================================================
--  Vientiane Open Karate — Supabase schema + seed
--  Run this in: Supabase Dashboard → SQL Editor → New query → Run
-- ============================================================

-- ---------- ATHLETES ----------
create table if not exists public.athletes (
  id            text primary key default gen_random_uuid()::text,
  name          text not null,
  country       text not null default '',
  category      text not null default '',
  weight_class  text not null default '',
  gender        text not null default 'male' check (gender in ('male','female')),
  qr_code       text not null default '',
  checked_in    boolean not null default false,
  checked_in_at timestamptz,
  team_name     text,
  bib           text,
  events        text,
  date_of_birth date,
  passport_no   text,
  created_at    timestamptz not null default now()
);
-- if the athletes table already exists, add the newer columns:
alter table public.athletes add column if not exists events        text;
alter table public.athletes add column if not exists date_of_birth date;
alter table public.athletes add column if not exists passport_no   text;

-- ---------- CHECK-IN LOG ----------
create table if not exists public.checkins (
  id           bigint generated always as identity primary key,
  athlete_id   text,
  athlete_name text,
  category     text,
  country      text,
  status       text not null,
  created_at   timestamptz not null default now()
);

-- ---------- TEAM REGISTRATIONS ----------
create table if not exists public.team_registrations (
  id             text primary key default gen_random_uuid()::text,
  team_name      text not null,
  manager_name   text not null,
  country        text,
  email          text,
  phone          text,
  athletes_count integer,
  notes          text,
  status         text not null default 'pending',
  created_at     timestamptz not null default now()
);

-- ---------- TEAM OFFICIALS ----------
create table if not exists public.official_registrations (
  id         text primary key default gen_random_uuid()::text,
  full_name  text not null,
  role       text not null,
  team       text,
  country    text,
  email      text,
  phone      text,
  status     text not null default 'pending',
  created_at timestamptz not null default now()
);

-- ---------- REFEREE REGISTRATIONS ----------
create table if not exists public.referee_registrations (
  id                  text primary key default gen_random_uuid()::text,
  full_name           text not null,
  certification_level text not null,
  license_no          text,
  country             text,
  email               text,
  phone               text,
  status              text not null default 'pending',
  created_at          timestamptz not null default now()
);

-- ---------- HOTEL BOOKINGS ----------
create table if not exists public.hotel_bookings (
  id          text primary key default gen_random_uuid()::text,
  full_name   text not null,
  room_type   text not null,
  rooms_count integer,
  dates       text,
  team        text,
  email       text,
  phone       text,
  status      text not null default 'pending',
  created_at  timestamptz not null default now()
);

-- ---------- Row Level Security ----------
-- Public can READ. All writes go through the server-side secret key, which
-- bypasses RLS — so no write policies are needed and the browser can never
-- write directly.
alter table public.athletes               enable row level security;
alter table public.checkins               enable row level security;
alter table public.team_registrations     enable row level security;
alter table public.official_registrations enable row level security;
alter table public.referee_registrations  enable row level security;
alter table public.hotel_bookings         enable row level security;

drop policy if exists "public read athletes"     on public.athletes;
drop policy if exists "public read checkins"     on public.checkins;
drop policy if exists "public read team_reg"     on public.team_registrations;
drop policy if exists "public read official_reg" on public.official_registrations;
drop policy if exists "public read referee_reg"  on public.referee_registrations;
drop policy if exists "public read hotel_book"   on public.hotel_bookings;

create policy "public read athletes"     on public.athletes               for select using (true);
create policy "public read checkins"     on public.checkins               for select using (true);
create policy "public read team_reg"     on public.team_registrations     for select using (true);
create policy "public read official_reg" on public.official_registrations for select using (true);
create policy "public read referee_reg"  on public.referee_registrations  for select using (true);
create policy "public read hotel_book"   on public.hotel_bookings         for select using (true);

-- ---------- SEED DATA ----------
insert into public.athletes (id, name, country, category, weight_class, gender, qr_code, checked_in, team_name, bib) values
  ('ATH001','Somchai Phommavong','LAO','Senior','-67kg','male','ATH001',false,'Vientiane A','101'),
  ('ATH002','Khamla Soudaly','LAO','Senior','-60kg','male','ATH002',false,'Vientiane A','102'),
  ('ATH003','Bouavanh Keodara','LAO','Junior','-61kg','female','ATH003',false,'Vientiane B','201'),
  ('ATH004','Daovone Sihalath','THA','Senior','-75kg','male','ATH004',false,'Bangkok A','103'),
  ('ATH005','Nittaya Phetsavanh','THA','Senior','-55kg','female','ATH005',false,'Bangkok A','301'),
  ('ATH006','Manh Nguyen','VIE','Cadet','-57kg','male','ATH006',false,'Hanoi','401'),
  ('ATH007','Sokha Pich','CAM','U14','-50kg','male','ATH007',false,'Phnom Penh','501'),
  ('ATH008','Mei Lin','CHN','Senior','-50kg','female','ATH008',false,'Kunming','302'),
  ('ATH009','Ryo Tanaka','JPN','Senior','-84kg','male','ATH009',false,'Osaka','104'),
  ('ATH010','Park Jisu','KOR','Junior','-55kg','male','ATH010',false,'Seoul','202')
on conflict (id) do nothing;
