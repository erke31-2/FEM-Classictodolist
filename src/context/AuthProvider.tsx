import { ReactNode, useEffect, useState } from "react";
import { authContext } from "../hooks/useAuth";
import { Provider, User, Session } from "@supabase/supabase-js";
import supabase from "../supabase/supabaseClient";
type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const storedSession = localStorage.getItem("supabaseSession");
  const initialSession: Session = storedSession
    ? JSON.parse(storedSession)
    : null;
  const [user, setUser] = useState<User | null>(initialSession?.user ?? null);
  const [session, setSession] = useState<Session | null>(
    initialSession ?? null
  );

  const loginWithProvider = async (provider: Provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
    });

    console.log(data.url);
    if (error) console.log(error);
  };

  const logoutWithProvider = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
  };

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session?.user ?? null);
        setSession(session ?? null);
        localStorage.setItem("supabaseSession", JSON.stringify(session));
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setSession(null);
        localStorage.removeItem("supabaseSession");
      }
    });
    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <authContext.Provider
      value={{ loginWithProvider, logoutWithProvider, user, session }}
    >
      {children}
    </authContext.Provider>
  );
};
export default AuthProvider;
