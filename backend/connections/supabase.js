import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv"; // data privacy

dotenv.config();

const supabaseUrl = "https://qckyppxsxptckoclbhzp.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
