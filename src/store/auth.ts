import { readLocalStorage, writeLocalStorage } from "@/utils/helpers";
import type { AuthSession } from "@supabase/supabase-js";
import { create } from "zustand";

interface AuthStore {
  isAuth: boolean;
  session: AuthSession | null;
  actions: {
    login: (session: AuthSession) => void;
    logout: () => void;
  };
}

const authStore = create<AuthStore>()((set) => ({
  isAuth: readLocalStorage<boolean>("isAuth", false),
  session: readLocalStorage<AuthSession | null>("authSession", null),
  actions: {
    login: (session) => {
      writeLocalStorage<boolean>("isAuth", true);
      writeLocalStorage<AuthSession>("authSession", session);
      set({ session, isAuth: true });
    },
    logout: () => {
      writeLocalStorage<boolean>("isAuth", false);
      writeLocalStorage<AuthSession | null>("authSession", null);
      set({ session: null, isAuth: false });
    },
  },
}));

export const useIsAuth = () => authStore((state) => state.isAuth);
export const useAuthSession = () => authStore((state) => state.session);
export const useAuthActions = () => authStore((state) => state.actions);
