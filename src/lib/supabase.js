//client
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('請設定 Supabase 環境變數！檢查 .env 檔案')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)