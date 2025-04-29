// /src/Apis/supabaseClient.js

import { createClient } from '@supabase/supabase-js'

// Replace these with your actual project info
const supabaseUrl = 'https://czgvjzcliplinegafvoq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6Z3ZqemNsaXBsaW5lZ2Fmdm9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3MDcwMjksImV4cCI6MjA1ODI4MzAyOX0.rn_MCQXC4mYTnum5UQVCfGUQjX_4zgdDlVHiHaYJICI' // Don't use service_role in frontend!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase
