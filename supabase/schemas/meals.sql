create table meals (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  name text not null
);