import React, { useState } from "react";
import { FC, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { getPublicKey } from "../../../core/auth/useCases/authUseCase";
import { AuthContext } from "./AuthContext";

export interface AuthState {
  privateKey: string | undefined;
  publickey: string | undefined;
}

const AUTH_INITIAL_STATE: AuthState = {
  privateKey: undefined,
  publickey: undefined,
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setSate] = useState<AuthState>(AUTH_INITIAL_STATE);

  const handleLogin = async () => {
    const pubkey = await getPublicKey();

    setSate({ ...state, publickey: pubkey });
    const privkey = await getPublicKey();
    setSate({ ...state, privateKey: privkey });
  };

  const handleLogout = async () => {
    setSate({ ...state, publickey: undefined, privateKey: undefined });
  };

  return (
    <AuthContext.Provider value={{ ...state, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
