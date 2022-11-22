import { FC, useReducer } from "react";
import { PropsWithChildren } from "react";
import { MailContext, MailReducer } from ".";
import { feedKind } from "../../interfaces";

export interface UIState {
  selectedFeed: feedKind;
  mailContentShowed: boolean;
}

const UI_INITIAL_STATE: UIState = {
  selectedFeed: "all",
  mailContentShowed: true,
};

export const MailProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(MailReducer, UI_INITIAL_STATE);

  const selectFeed = (feed: feedKind) => {
    dispatch({ type: "UI - Select feed", payload: feed });
  };
  const showMailContent = (payload: boolean) => {
    dispatch({ type: "UI - Show mail content", payload });
  };

  return (
    <MailContext.Provider
      value={{
        ...state,

        //Methods
        selectFeed,
        showMailContent,
      }}
    >
      {children}
    </MailContext.Provider>
  );
};
