import { createContext } from "react";
import { feedKind } from "../../interfaces";

interface ContextProps {
  selectedFeed: feedKind;
  mailContentShowed: boolean;

  //Methods
  selectFeed: (feed: feedKind) => void;
  showMailContent: (payload: boolean) => void;
}

export const MailContext = createContext({} as ContextProps);
