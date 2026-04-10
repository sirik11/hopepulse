-- HopePulse Database Schema
-- Run this in Supabase SQL Editor

-- Profiles table (extends Supabase auth.users)
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  full_name text,
  created_at timestamp with time zone default now()
);

-- Saved diagnoses
create table if not exists public.saved_diagnoses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  cancer_type text not null,
  stage text,
  age_group text not null,
  notes text,
  created_at timestamp with time zone default now()
);

-- Chat history
create table if not exists public.chat_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  role text check (role in ('user', 'assistant')) not null,
  content text not null,
  created_at timestamp with time zone default now()
);

-- Bookmarked cases
create table if not exists public.bookmarked_cases (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  case_id text not null,
  created_at timestamp with time zone default now(),
  unique(user_id, case_id)
);

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.saved_diagnoses enable row level security;
alter table public.chat_history enable row level security;
alter table public.bookmarked_cases enable row level security;

-- RLS Policies: users can only see their own data
create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

create policy "Users can view own diagnoses"
  on public.saved_diagnoses for all using (auth.uid() = user_id);

create policy "Users can manage own chat history"
  on public.chat_history for all using (auth.uid() = user_id);

create policy "Users can manage own bookmarks"
  on public.bookmarked_cases for all using (auth.uid() = user_id);

-- Auto-create profile when user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name'
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
