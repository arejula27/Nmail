import { FC, useReducer } from "react";
import { PropsWithChildren } from "react";
import { UIContext, UiReducer } from ".";
import { feedKind } from "../../interfaces";

export interface UIState {
  selectedFeed: feedKind;
}

const UI_INITIAL_STATE: UIState = {
  selectedFeed: "all",
};

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(UiReducer, UI_INITIAL_STATE);

  const selectFeed = (feed: feedKind) => {
    dispatch({ type: "UI - Select feed", payload: feed });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,

        //Methods
        selectFeed,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
