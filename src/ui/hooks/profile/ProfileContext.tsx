import { createContext, useContext } from "react";
import { User } from "../../../core/profile/domain";

interface ContextProps {
  privateKey: string | null;
  publicKey: string | null;
  currentUser: User;

  //Methods
  handleLogin(publicKey: string, privateKey: string): void;
  handleLogout(): void;
  reloadUser(): void;
}

export const ProfileContext = createContext({} as ContextProps);

export const useProfile = () => {
  return useContext(ProfileContext);
};
