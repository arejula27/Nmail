import { FC, useReducer } from "react";
import { PropsWithChildren } from "react";
import { UIContext } from "./UIContext";
import { UIReducer } from "./UIReducer";

export interface UIState {
  newMessageModalShowed: boolean;
  menuDrawerShowed: boolean;
}

const UI_INITIAL_STATE: UIState = {
  newMessageModalShowed: false,
  menuDrawerShowed: false,
};

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE);

  const showNewMessageModal = (payload: boolean) => {
    dispatch({ type: "UI - Show new message modal", payload });
  };
  const showMenuDrawer = (payload: boolean) => {
    dispatch({ type: "UI - Show menu drawer", payload });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,

        //Methods
        showNewMessageModal,
        showMenuDrawer,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
