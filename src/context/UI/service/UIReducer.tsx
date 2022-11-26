import { UIState } from "./UIProvider";

type UIActionType =
  | { type: "UI - Show new message modal"; payload: boolean }
  | { type: "UI - Show menu drawer"; payload: boolean };

export const UIReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case "UI - Show new message modal":
      return {
        ...state,
        newMessageModalShowed: action.payload,
      };
    case "UI - Show menu drawer":
      return {
        ...state,
        menuDrawerShowed: action.payload,
      };

    default:
      return state;
  }
};
