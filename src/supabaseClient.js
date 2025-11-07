import { createClient } from "@supabase/supabase-js";

// In a Create React App (react-scripts) project the environment variables
// should be accessed via process.env and must start with REACT_APP_.
// Example in your .env file:
// REACT_APP_SUPABASE_PROJECT_URL=https://xyz.supabase.co
// REACT_APP_SUPABASE_PROJECT_API_KEY=public-anon-key

const supabaseUrl = process.env.REACT_APP_SUPABASE_PROJECT_URL;
const supabaseANONKey = process.env.REACT_APP_SUPABASE_PROJECT_API_KEY;

if (!supabaseUrl || !supabaseANONKey) {
  // Helpful warning during development. In production you should ensure
  // the env vars are set correctly in your build/deployment pipeline.
  // Do not log secrets in production.
  // eslint-disable-next-line no-console
  console.warn(
    "Supabase env vars are missing. Set REACT_APP_SUPABASE_PROJECT_URL and REACT_APP_SUPABASE_PROJECT_API_KEY in your .env."
  );
}

// export const supabase = createClient(supabaseUrl ?? "", supabaseANONKey ?? "");
export const supabase = createClient(supabaseUrl, supabaseANONKey);
