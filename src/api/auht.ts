import { type AuthCredentials } from "@/utils/types";
import supabase from "./api";

export const login = async (params: AuthCredentials) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: params.email,
    password: params.password,
  });
  if (error) throw error;
  return data.session;
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
};
