-- ============================================================
--  Relationships / Foreign Keys  (run once on the existing DB)
--  Supabase → SQL Editor → paste → Run. Safe & idempotent.
-- ============================================================

-- 1) checkins.athlete_id  ->  athletes.id   (One athlete : many check-ins)
--    Clean any orphan / not-found rows first so the FK can be created,
--    then add a NULLABLE FK (not-found scans keep athlete_id = null).
update public.checkins c set athlete_id = null
  where athlete_id is not null
    and not exists (select 1 from public.athletes a where a.id = c.athlete_id);

alter table public.checkins drop constraint if exists checkins_athlete_id_fkey;
alter table public.checkins
  add constraint checkins_athlete_id_fkey
  foreign key (athlete_id) references public.athletes(id) on delete set null;

-- 2) team_registrations as the HUB.
--    Add a nullable team_registration_id FK to the related tables.
alter table public.athletes
  add column if not exists team_registration_id text references public.team_registrations(id) on delete set null;
alter table public.official_registrations
  add column if not exists team_registration_id text references public.team_registrations(id) on delete set null;
alter table public.hotel_bookings
  add column if not exists team_registration_id text references public.team_registrations(id) on delete set null;

-- 3) Backfill the links by matching existing free-text team names (best effort).
update public.athletes a set team_registration_id = t.id
  from public.team_registrations t
  where a.team_registration_id is null and a.team_name is not null
    and lower(trim(a.team_name)) = lower(trim(t.team_name));

update public.official_registrations o set team_registration_id = t.id
  from public.team_registrations t
  where o.team_registration_id is null and o.team is not null
    and lower(trim(o.team)) = lower(trim(t.team_name));

update public.hotel_bookings h set team_registration_id = t.id
  from public.team_registrations t
  where h.team_registration_id is null and h.team is not null
    and lower(trim(h.team)) = lower(trim(t.team_name));

-- Note: the original text columns (athletes.team_name, official.team, hotel.team,
-- and checkins.athlete_name/category/country) are kept as a human-readable
-- snapshot / fallback. They can be dropped later once the app reads via JOINs.
