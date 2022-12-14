import { useEffect, useState } from "react";
import { FC, PropsWithChildren } from "react";
import { MailUseCasesImpl } from "../../../core/mail/useCases/mailUseCases";
import { User } from "../../../core/profile/domain";
import { ProfileUseCasesImpl } from "../../../core/profile/useCases/ProfileUseCase";
import { ProfileContext } from "./ProfileContext";

export interface ProfileState {
  privateKey: string | null;
  publicKey: string | null;
  currentUser: User;
}

const PROFILE_INITIAL_STATE: ProfileState = {
  privateKey: ProfileUseCasesImpl.Execute.getPrivateKey(),
  publicKey: ProfileUseCasesImpl.Execute.getPublicKey(),
  currentUser: { name: undefined, picture: undefined },
};

export const ProfileProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setSate] = useState<ProfileState>(PROFILE_INITIAL_STATE);
  const useCaseAuth = ProfileUseCasesImpl.Execute;

  useEffect(() => {
    if (state.publicKey !== null && state.privateKey !== null) {
      //get User data (name, picture,etc.)
      reloadUser();
      //save privkey on pool
      useCaseAuth.setPrivateKey(state.privateKey);
    }
  }, [state.privateKey]);

  const handleLogin = (publicKey: string, privateKey: string) => {
    useCaseAuth.setPrivateKey(privateKey);
    useCaseAuth.setPublicKey(publicKey);
    setSate({ ...state, publicKey: publicKey, privateKey: privateKey });
  };

  const handleLogout = () => {
    useCaseAuth.setPublicKey(null);
    useCaseAuth.setPrivateKey(null);
    setSate({ ...state, publicKey: null, privateKey: null });
    useCaseAuth.removeConections();
    MailUseCasesImpl.Execute.clearMailList();
  };
  const reloadUser = () => {
    useCaseAuth.getUSerProfileInfo(state.publicKey!).then((user) => {
      setSate({ ...state, currentUser: user });
    });
  };
  //reloadUser();
  return (
    <ProfileContext.Provider
      value={{ ...state, handleLogin, handleLogout, reloadUser }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
