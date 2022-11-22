import { UIState } from ".";
import { feedKind } from "../../interfaces";

type UIActionType =
  | { type: "UI - Select feed"; payload: feedKind }
  | { type: "UI - Show mail content"; payload: boolean };

export const MailReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case "UI - Select feed":
      return {
        ...state,
        selectedFeed: action.payload,
      };
    case "UI - Show mail content":
      return {
        ...state,
        mailContentShowed: action.payload,
      };

    default:
      return state;
  }
};
