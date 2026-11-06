-- =====================================================================
-- NAS-PYW: registrations, private file storage and admin access
--
-- Run once in Supabase: SQL Editor -> New query -> paste -> Run.
--
-- Security model
--   * Browsers never touch these tables or the storage bucket directly.
--     All reads/writes go through server functions that use the
--     SUPABASE_SERVICE_ROLE_KEY (server only).
--   * RLS is enabled on every table with NO policies, and anon /
--     authenticated roles are revoked. So even a leaked anon key cannot
--     read or write submissions, admins, or files.
--   * Admin status comes ONLY from a row in public.admin_users. Nothing
--     the browser sends (JWT claims, user_metadata, request bodies) can
--     create that row. Rows are added manually by you in the SQL editor.
-- =====================================================================


-- 1. Admins ------------------------------------------------------------

create table if not exists public.admin_users (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
revoke all on table public.admin_users from anon, authenticated;


-- 2. Registrations -----------------------------------------------------

create table if not exists public.registrations (
  id                   uuid primary key default gen_random_uuid(),
  created_at           timestamptz not null default now(),

  full_name            text not null check (char_length(full_name) between 2 and 120),
  gender               text not null default 'Female' check (gender = 'Female'),
  phone                text not null check (phone ~ '^[0-9]{11}$'),
  age                  integer not null check (age between 18 and 40),

  lga_code             text not null,
  lga_name             text not null,
  ward_code            text not null,
  ward_name            text not null,
  polling_unit_code    text not null,
  polling_unit_name    text not null,

  voters_card_number   text not null check (voters_card_number ~ '^[0-9]{19}$'),

  occupation           text not null check (occupation in (
                         'Student', 'Civil Servant', 'Entrepreneur',
                         'Artisan', 'Farmer', 'Unemployed', 'Other')),
  other_occupation     text check (char_length(other_occupation) <= 100),
  constraint other_occupation_required
    check (occupation <> 'Other' or char_length(coalesce(other_occupation, '')) > 0),

  passport_path        text not null,
  voters_card_path     text not null
);

-- One registration per Voter's Card Number.
create unique index if not exists registrations_voters_card_number_key
  on public.registrations (voters_card_number);

create index if not exists registrations_created_at_idx
  on public.registrations (created_at desc);

create index if not exists registrations_lga_code_idx
  on public.registrations (lga_code);

alter table public.registrations enable row level security;
revoke all on table public.registrations from anon, authenticated;


-- 3. Private file storage ---------------------------------------------
-- Private bucket: files are only reachable through short-lived signed URLs
-- that the server generates after checking the admin. No storage policies
-- are created, so anon/authenticated clients have no access at all.
-- Max 5 MB per file, images only.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'registration-files',
  'registration-files',
  false,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public             = excluded.public,
  file_size_limit    = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;


-- 4. Creating the first admin ----------------------------------------
-- Do these steps in the Supabase dashboard (NOT in the app):
--
--   a) Authentication -> Sign In / Providers -> Email:
--      turn OFF "Allow new users to sign up". Nobody can self-register.
--
--   b) Authentication -> Users -> "Add user" -> "Create new user":
--      enter your email and a strong password, tick "Auto Confirm User".
--
--   c) Run this here, using that same email:
--
--      insert into public.admin_users (user_id)
--      select id from auth.users where email = 'you@example.com';
--
-- To revoke someone's access later:
--      delete from public.admin_users where user_id = '<their-user-uuid>';
