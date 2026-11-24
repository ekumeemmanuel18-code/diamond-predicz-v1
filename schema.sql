-- Initial relational schema. Apply only after creating a Supabase project.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'user' check (role in ('user','admin')),
  membership text not null default 'free' check (membership in ('free','premium')),
  created_at timestamptz not null default now()
);

create table if not exists public.competitions (
  id bigint generated always as identity primary key,
  provider_id bigint unique,
  country text not null,
  name text not null,
  season integer,
  is_active boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.teams (
  id bigint generated always as identity primary key,
  provider_id bigint unique,
  name text not null,
  country text,
  logo_url text,
  updated_at timestamptz not null default now()
);

create table if not exists public.fixtures (
  id bigint generated always as identity primary key,
  provider_id bigint unique,
  competition_id bigint references public.competitions(id),
  home_team_id bigint references public.teams(id),
  away_team_id bigint references public.teams(id),
  kickoff_at timestamptz not null,
  status text not null default 'scheduled',
  home_score integer,
  away_score integer,
  data_source text not null,
  last_synced_at timestamptz
);

create table if not exists public.predictions (
  id bigint generated always as identity primary key,
  fixture_id bigint not null references public.fixtures(id) on delete cascade,
  model_version text not null,
  home_xg numeric(6,3),
  away_xg numeric(6,3),
  home_win_probability numeric(5,2) not null,
  draw_probability numeric(5,2) not null,
  away_win_probability numeric(5,2) not null,
  predicted_home_goals integer,
  predicted_away_goals integer,
  generated_at timestamptz not null default now(),
  check (home_win_probability + draw_probability + away_win_probability between 99.9 and 100.1)
);

create table if not exists public.favourites (
  user_id uuid not null references auth.users(id) on delete cascade,
  entity_type text not null check (entity_type in ('team','competition')),
  entity_provider_id bigint not null,
  created_at timestamptz not null default now(),
  primary key(user_id, entity_type, entity_provider_id)
);

create index if not exists fixtures_kickoff_idx on public.fixtures(kickoff_at);
create index if not exists fixtures_competition_idx on public.fixtures(competition_id);
create index if not exists predictions_fixture_generated_idx on public.predictions(fixture_id, generated_at desc);

alter table public.profiles enable row level security;
alter table public.favourites enable row level security;
create policy "Users can read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users manage own favourites" on public.favourites for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
