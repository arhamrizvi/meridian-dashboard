import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ── Types ──────────────────────────────────────────────────────────────────

export interface OverviewKpis {
  occupancy_pct: string
  total_revenue_sar: number
  active_tenants: number
  branch_count: number
}

export interface MonthlyRevenue {
  month_label: string
  month_order: number
  desk_sar: number
  meeting_sar: number
  events_sar: number
  total_sar: number
}

export interface SpaceUtil {
  space_type: string
  total_capacity: number
  units_used: number
  display_color: string
  utilization_pct: number
}

export interface RevenueBranch {
  name: string
  city: string
  monthly_revenue: number
  revenue_pct: number
}

export interface PnlRow {
  label: string
  amount_sar: number
  row_type: 'revenue' | 'sub' | 'cost' | 'profit' | 'ebitda'
  sort_order: number
}

export interface FinanceSummary {
  gross_revenue: number
  gross_profit: number
  ebitda: number
  gross_margin_pct: string
}

// ── Data fetchers (server-safe) ────────────────────────────────────────────

export async function fetchOverviewKpis(): Promise<OverviewKpis | null> {
  const { data, error } = await supabase.from('v_ws_overview_kpis').select('*').single()
  if (error) { console.error('fetchOverviewKpis:', error.message); return null }
  return data
}

export async function fetchMonthlyRevenue(): Promise<MonthlyRevenue[]> {
  const { data, error } = await supabase.from('v_ws_monthly_revenue').select('*')
  if (error) { console.error('fetchMonthlyRevenue:', error.message); return [] }
  return data ?? []
}

export async function fetchSpaceUtil(): Promise<SpaceUtil[]> {
  const { data, error } = await supabase.from('v_ws_space_util').select('*')
  if (error) { console.error('fetchSpaceUtil:', error.message); return [] }
  return data ?? []
}

export async function fetchRevenueBranches(): Promise<RevenueBranch[]> {
  const { data, error } = await supabase.from('v_ws_revenue_by_branch').select('*')
  if (error) { console.error('fetchRevenueBranches:', error.message); return [] }
  return data ?? []
}

export async function fetchPnl(): Promise<PnlRow[]> {
  const { data, error } = await supabase.from('ws_pnl').select('*').order('sort_order')
  if (error) { console.error('fetchPnl:', error.message); return [] }
  return data ?? []
}

export async function fetchFinanceSummary(): Promise<FinanceSummary | null> {
  const { data, error } = await supabase.from('v_ws_finance_summary').select('*').single()
  if (error) { console.error('fetchFinanceSummary:', error.message); return null }
  return data
}
