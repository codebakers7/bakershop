import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import { createBrowserClient as createBrowserClientFromSupabase } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabasepubKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!

export const createClient = () => {
  return createSupabaseClient(supabaseUrl, supabasepubKey)
}
export function createBrowserClient() {
  return createBrowserClientFromSupabase(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
