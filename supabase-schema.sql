create extension if not exists "pgcrypto";
create extension if not exists "pg_trgm";

create table if not exists public.trips (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  destination text not null,
  days text not null,
  budget text not null,
  interests text not null,
  itinerary jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.destinations (
  id uuid primary key default gen_random_uuid(),
  state text not null,
  city text not null,
  famous_places text not null,
  food text not null,
  best_time text not null,
  avg_budget text not null,
  travel_tips text not null
);

create index if not exists destinations_state_idx
  on public.destinations (state);

create index if not exists destinations_city_idx
  on public.destinations (city);

create index if not exists destinations_state_trgm_idx
  on public.destinations using gin (state gin_trgm_ops);

create index if not exists destinations_city_trgm_idx
  on public.destinations using gin (city gin_trgm_ops);

alter table public.trips enable row level security;
alter table public.messages enable row level security;
alter table public.destinations enable row level security;

create policy "Users can read own trips"
  on public.trips for select
  using (auth.uid() = user_id);

create policy "Users can insert own trips"
  on public.trips for insert
  with check (auth.uid() = user_id);

create policy "Users can update own trips"
  on public.trips for update
  using (auth.uid() = user_id);

create policy "Users can read own messages"
  on public.messages for select
  using (auth.uid() = user_id);

create policy "Users can insert own messages"
  on public.messages for insert
  with check (auth.uid() = user_id);

create policy "Anyone can read destinations"
  on public.destinations for select
  using (true);
