import { createContext, useContext } from "react";
import { User } from "../../../core/auth/domain";

interface ContextProps {
  privateKey: string | null;
  publicKey: string | null;
  currentUser: User;

  //Methods
  handleLogin(publicKey: string, privateKey: string): void;
  handleLogout(): void;
  reloadUser(): void;
}

export const AuthContext = createContext({} as ContextProps);

export const useAuth = () => {
  return useContext(AuthContext);
};
