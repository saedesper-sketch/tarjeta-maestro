// @ts-nocheck
// The Supabase client is loaded from a CDN in index.html, so we can ignore TypeScript errors.

// --- FINAL STEP: CONNECT YOUR SUPABASE PROJECT ---

// 1. Go to your Supabase project dashboard.
// 2. In the left sidebar, click the 'Settings' icon (the gear).
// 3. In the settings menu, click on 'API'.
// 4. Under 'Project URL', copy the URL and paste it below.
// 5. Under 'Project API Keys', copy the 'anon' 'public' key and paste it below.

const supabaseUrl = 'https://gmcjmtxvxlxsichknhmk.supabase.co'; // <-- IMPORTANT: PASTE YOUR SUPABASE URL HERE
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtY2ptdHh2eGx4c2ljaGtuaG1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNzMzNjMsImV4cCI6MjA3ODc0OTM2M30.QGPWEmEBscW-kntE3QctiidiRuWiXyENDSYwPaYzUAw'; // <-- IMPORTANT: PASTE YOUR SUPABASE ANON KEY HERE

// ---------------------------------------------------

// Create a single Supabase client for the entire app.
// We use `window.supabase` here to refer to the client loaded from the CDN.
export const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
