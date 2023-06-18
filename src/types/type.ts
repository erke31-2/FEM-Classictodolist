import { Provider, User, Session } from "@supabase/supabase-js";

export type Todo = {
  id: string;
  title: string;
  is_completed: boolean;
  created_at: Date;
};
export type Todos = Todo[];

export type AuthContextType = {
  user: User | null;
  session: Session | null;
  loginWithProvider: (provider: Provider) => void;
  logoutWithProvider: () => void;
};
