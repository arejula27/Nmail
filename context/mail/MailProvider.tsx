import { FC, useReducer } from "react";
import { PropsWithChildren } from "react";
import { MailContext, MailReducer } from ".";
import { feedKind, MailData } from "../../src/mails/domain";

export interface MailState {
  selectedFeed: feedKind;
  mailContentShowed: boolean;
  selectedMail: MailData | undefined;
}

const UI_INITIAL_STATE: MailState = {
  selectedFeed: "all",
  mailContentShowed: true,
  selectedMail: undefined,
};

export const MailProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(MailReducer, UI_INITIAL_STATE);

  const selectFeed = (feed: feedKind) => {
    dispatch({ type: "UI - Select feed", payload: feed });
  };
  const showMailContent = (payload: boolean) => {
    dispatch({ type: "UI - Show mail content", payload });
  };

  const selectMail = (mail: MailData) => {
    dispatch({ type: "UI - Select mail", payload: mail });
  };
  const unselectMail = () => {
    dispatch({ type: "UI - Select mail", payload: undefined });
  };

  return (
    <MailContext.Provider
      value={{
        ...state,

        //Methods
        selectFeed,
        showMailContent,
        selectMail,
        unselectMail,
      }}
    >
      {children}
    </MailContext.Provider>
  );
};
