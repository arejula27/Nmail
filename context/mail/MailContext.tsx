import { createContext } from "react";
import { feedKind, MailData } from "../../src/mails/domain";

interface ContextProps {
  selectedFeed: feedKind;
  mailContentShowed: boolean;
  selectedMail?: MailData;

  //Methods
  selectFeed: (feed: feedKind) => void;
  showMailContent: (payload: boolean) => void;
  selectMail: (mail: MailData) => void;
  unselectMail: () => void;
}

export const MailContext = createContext({} as ContextProps);
