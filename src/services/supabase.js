import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://iimjbvdskmlpuhofgmcn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpbWpidmRza21scHVob2ZnbWNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2MTMxNTEsImV4cCI6MjA1MzE4OTE1MX0.tcuDOCwbndKAs4B1kN7FIE9BsCH5hHlXCLoadbqeSnQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
