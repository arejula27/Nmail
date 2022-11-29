import { createContext, useContext } from "react";

interface ContextProps {
  privateKey: string | undefined;
  publickey: string | undefined;

  //Methods
  handleLogin(): Promise<void>;
  handleLogout(): Promise<void>;
}

export const AuthContext = createContext({} as ContextProps);

export const useAuth = () => {
  return useContext(AuthContext);
};
