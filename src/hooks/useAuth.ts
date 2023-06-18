import { useContext, createContext } from "react";
import { AuthContextType } from "../types/type";

export const authContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loginWithProvider: (provider) => {
    console.log(provider);
  },
  logoutWithProvider: () => {
    console.log("hello");
  },
});

const useAuth = () => {
  return useContext(authContext);
};
export default useAuth;
