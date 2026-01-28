import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null

export type Expense = {
  id: string
  user_email: string
  amount: number
  description: string
  spent_by: 'douglas' | 'tamires'
  date: string
  created_at: string
}

export type ExpenseInsert = Omit<Expense, 'id' | 'created_at'>
