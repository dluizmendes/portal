# Supabase Database Setup Guide

## Step 1: Create Supabase Account
1. Go to https://supabase.com and sign up
2. Create a new project
3. Go to Project Settings > API to find:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Step 2: Create Expenses Table
In Supabase SQL Editor, run:

```sql
create table if not exists expenses (
  id uuid primary key default gen_random_uuid(),
  user_email text not null,
  amount decimal(10, 2) not null,
  description text,
  spent_by text not null check (spent_by in ('douglas', 'tamires')),
  date date not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create index for faster queries
create index expenses_user_email_idx on expenses(user_email);
create index expenses_date_idx on expenses(date);

-- Enable Row Level Security
alter table expenses enable row level security;

-- Users can only see/edit their own expenses
create policy "Users can view their own expenses"
  on expenses for select
  using (user_email = auth.jwt() ->> 'email');

create policy "Users can insert their own expenses"
  on expenses for insert
  with check (user_email = auth.jwt() ->> 'email');

create policy "Users can delete their own expenses"
  on expenses for delete
  using (user_email = auth.jwt() ->> 'email');
```

## Step 3: Configure Environment Variables
1. Copy `.env.local.example` to `.env.local`
2. Add your Supabase keys:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   ```

## Step 4: Update Spending Page
The `/dash/spending` page will automatically use the database when properly configured.
It will:
- Load expenses from Supabase instead of localStorage
- Sync new expenses to the database
- Delete expenses from the database
- Calculate totals in real-time

## Notes
- Email-based access control: each user can only see their own expenses
- Data persists across devices and sessions
- Row Level Security (RLS) ensures privacy
