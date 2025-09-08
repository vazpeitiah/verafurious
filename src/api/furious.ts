import { furiousSchema, type Furious } from "@/utils/types";
import supabase from "./api";

export const getFurious = async (): Promise<Furious[]> => {
  const { data } = await supabase
    .from("furious")
    .select("id,name,ordinal")
    .eq("active", true)
    .order("ordinal", { ascending: true });
  return furiousSchema.array().parse(data);
};
