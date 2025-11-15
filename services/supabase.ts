// @ts-nocheck
// The Supabase client is loaded from a CDN in index.html, so we can ignore TypeScript errors.

// --- FINAL STEP: CONNECT YOUR SUPABASE PROJECT ---

// 1. Go to your Supabase project dashboard.
// 2. In the left sidebar, click the 'Settings' icon (the gear).
// 3. In the settings menu, click on 'API'.
// 4. Under 'Project URL', copy the URL and paste it below.
// 5. Under 'Project API Keys', copy the 'anon' 'public' key and paste it below.

const supabaseUrl = 'YOUR_SUPABASE_URL'; // <-- IMPORTANT: PASTE YOUR SUPABASE URL HERE
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'; // <-- IMPORTANT: PASTE YOUR SUPABASE ANON KEY HERE

// ---------------------------------------------------

// Add a check to ensure the credentials have been added.
if (supabaseUrl === 'YOUR_SUPABASE_URL' || !supabaseUrl) {
    alert('Supabase URL is not configured. Please open services/supabase.ts, find your project URL, and paste it.');
}
if (supabaseKey === 'YOUR_SUPABASE_ANON_KEY' || !supabaseKey) {
    alert('Supabase anon key is not configured. Please open services/supabase.ts, find your anon key, and paste it.');
}


// Create a single Supabase client for the entire app.
// We use `window.supabase` here to refer to the client loaded from the CDN.
export const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);