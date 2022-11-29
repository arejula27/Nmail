import { useState } from "react";
import { FC, PropsWithChildren } from "react";
import { AuthUseCasesImpl } from "../../../core/auth/useCases/authUseCase";
import { AuthContext } from "./AuthContext";

export interface AuthState {
  privateKey: string | null;
  publicKey: string | null;
}

const AUTH_INITIAL_STATE: AuthState = {
  privateKey: AuthUseCasesImpl.Execute.getPrivateKey(),
  publicKey: AuthUseCasesImpl.Execute.getPublicKey(),
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setSate] = useState<AuthState>(AUTH_INITIAL_STATE);

  const useAth = AuthUseCasesImpl.Execute;
  const handleLogin = (publicKey: string, privateKey: string) => {
    //console.log(publicKey);

    useAth.setPublicKey(publicKey);
    setSate({ ...state, publicKey: publicKey });

    useAth.setPrivateKey(privateKey);
    setSate({ ...state, privateKey: privateKey });
  };

  const handleLogout = () => {
    useAth.setPublicKey(null);
    useAth.setPrivateKey(null);
    setSate({ ...state, publicKey: null, privateKey: null });
  };

  return (
    <AuthContext.Provider value={{ ...state, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
