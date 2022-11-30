import { useEffect, useState } from "react";
import { FC, PropsWithChildren } from "react";
import { User } from "../../../core/profile/domain";
import { ProfileUseCasesImpl } from "../../../core/profile/useCases/ProfileUseCase";
import { AuthContext } from "./AuthContext";

export interface AuthState {
  privateKey: string | null;
  publicKey: string | null;
  currentUser: User;
}

const AUTH_INITIAL_STATE: AuthState = {
  privateKey: ProfileUseCasesImpl.Execute.getPrivateKey(),
  publicKey: ProfileUseCasesImpl.Execute.getPublicKey(),
  currentUser: { name: undefined, picture: undefined },
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setSate] = useState<AuthState>(AUTH_INITIAL_STATE);
  const useCaseAuth = ProfileUseCasesImpl.Execute;

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
    useCaseAuth.getUSerProfileInfo(state.publicKey!).then((user) => {
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
