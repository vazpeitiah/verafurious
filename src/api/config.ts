import { appConfigSchema, type AppConfig } from "@/utils/types";
import supabase from "./api";

export const getConfig = async (): Promise<AppConfig> => {
  const { data } = await supabase
    .from("config")
    .select("meeting_url, start_date, weeks_size")
    .limit(1)
    .single();
  return appConfigSchema.parse(data);
};
