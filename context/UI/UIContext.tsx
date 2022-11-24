import { createContext } from "react";
import { feedKind, MailData } from "../../interfaces";

interface ContextProps {
  newMessageModalShowed: boolean;
  menuDrawerShowed: boolean;

  //Methods
  showNewMessageModal: (payload: boolean) => void;
  showMenuDrawer: (payload: boolean) => void;
}

export const UIContext = createContext({} as ContextProps);
