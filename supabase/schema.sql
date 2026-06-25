-- ============================================================
--  Vientiane Open Karate — Supabase schema + seed
--  Run this in: Supabase Dashboard → SQL Editor → New query → Run
-- ============================================================

-- ---------- MATCHES ----------
create table if not exists public.matches (
  id           text primary key default gen_random_uuid()::text,
  category     text not null,
  weight_class text not null default '',
  gender       text not null default 'male',
  round        text not null default '',
  red_athlete  text not null default '',
  blue_athlete text not null default '',
  red_score    integer not null default 0,
  blue_score   integer not null default 0,
  winner       text,
  status       text not null default 'scheduled' check (status in ('scheduled','live','completed')),
  mat          integer not null default 1,
  start_time   text,
  created_at   timestamptz not null default now()
);

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
  created_at    timestamptz not null default now()
);

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

-- ---------- REGISTRATIONS (team / official / referee / hotel) ----------
create table if not exists public.registrations (
  id           text primary key default gen_random_uuid()::text,
  type         text not null check (type in ('team','official','referee','hotel')),
  name         text not null,
  email        text,
  phone        text,
  country      text,
  organization text,
  role         text,
  quantity     integer,
  notes        text,
  status       text not null default 'pending',
  created_at   timestamptz not null default now()
);

-- ---------- Row Level Security ----------
-- Public can READ (for /results and /checkin). All writes go through the
-- server-side service-role key, which bypasses RLS — so no write policies
-- are needed and the browser can never write directly.
alter table public.matches       enable row level security;
alter table public.athletes      enable row level security;
alter table public.checkins      enable row level security;
alter table public.registrations enable row level security;

drop policy if exists "public read matches"       on public.matches;
drop policy if exists "public read athletes"      on public.athletes;
drop policy if exists "public read checkins"      on public.checkins;
drop policy if exists "public read registrations" on public.registrations;

create policy "public read matches"       on public.matches       for select using (true);
create policy "public read athletes"      on public.athletes      for select using (true);
create policy "public read checkins"      on public.checkins      for select using (true);
create policy "public read registrations" on public.registrations for select using (true);

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

insert into public.matches (id, category, weight_class, gender, round, red_athlete, blue_athlete, red_score, blue_score, winner, status, mat, start_time) values
  ('M001','Senior','-67kg','male','Quarter Final','Somchai Phommavong','Ryo Tanaka',4,2,'Somchai Phommavong','completed',1,'09:00'),
  ('M002','Senior','-75kg','male','Quarter Final','Daovone Sihalath','Manh Nguyen',3,3,null,'live',2,'09:30'),
  ('M003','Senior','-55kg','female','Semi Final','Nittaya Phetsavanh','Mei Lin',0,0,null,'scheduled',1,'10:00'),
  ('M004','Junior','-61kg','female','Final','Bouavanh Keodara','Park Jisu',0,0,null,'scheduled',3,'11:00'),
  ('M005','Cadet','-57kg','male','Semi Final','Sokha Pich','Khamla Soudaly',0,0,null,'scheduled',2,'11:30')
on conflict (id) do nothing;
