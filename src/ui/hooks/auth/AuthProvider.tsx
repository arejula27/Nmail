import { useEffect, useState } from "react";
import { FC, PropsWithChildren } from "react";
import { User } from "../../../core/auth/domain";
import { AuthUseCasesImpl } from "../../../core/auth/useCases/authUseCase";
import { AuthContext } from "./AuthContext";

export interface AuthState {
  privateKey: string | null;
  publicKey: string | null;
  currentUser: User;
}

const AUTH_INITIAL_STATE: AuthState = {
  privateKey: AuthUseCasesImpl.Execute.getPrivateKey(),
  publicKey: AuthUseCasesImpl.Execute.getPublicKey(),
  currentUser: { name: undefined, picture: undefined },
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setSate] = useState<AuthState>(AUTH_INITIAL_STATE);
  const useCaseAuth = AuthUseCasesImpl.Execute;

  useEffect(() => {
    useCaseAuth.setPrivateKey(state.privateKey);
    useCaseAuth.setPublicKey(state.publicKey);
  }, [state]);

  const handleLogin = (publicKey: string, privateKey: string) => {
    setSate({ ...state, publicKey: publicKey, privateKey: privateKey });
  };

  const handleLogout = () => {
    useCaseAuth.setPublicKey(null);
    useCaseAuth.setPrivateKey(null);
    setSate({ ...state, publicKey: null, privateKey: null });
  };
  const reloadUser = () => {
    useCaseAuth.getUSerProfileInfo().then((user) => {
      setSate({ ...state, currentUser: user });
    });
  };
  reloadUser();
  return (
    <AuthContext.Provider
      value={{ ...state, handleLogin, handleLogout, reloadUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
