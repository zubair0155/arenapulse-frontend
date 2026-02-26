import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hitegkdaplzdbjgbggsz.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpdGVna2RhcGx6ZGJqZ2JnZ3N6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3OTg0NTIsImV4cCI6MjA4NzM3NDQ1Mn0.BD4wLpoS4SifG9Y9FiAE3pgAvELPiOip7B7d-kpUx7U";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);