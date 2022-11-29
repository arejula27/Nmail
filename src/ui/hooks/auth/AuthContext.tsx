import { createContext, useContext } from "react";

interface ContextProps {
  privateKey: string | null;
  publicKey: string | null;

  //Methods
  handleLogin(publicKey: string, privateKey: string): void;
  handleLogout(): void;
}

export const AuthContext = createContext({} as ContextProps);

export const useAuth = () => {
  return useContext(AuthContext);
};
