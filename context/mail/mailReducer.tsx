import { UIState } from ".";
import { feedKind } from "../../interfaces";
import { MailData } from "../../interfaces/mail";

type UIActionType =
  | { type: "UI - Select feed"; payload: feedKind }
  | { type: "UI - Show mail content"; payload: boolean }
  | { type: "UI - Select mail"; payload?: MailData };

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
    case "UI - Select mail":
      return {
        ...state,
        selectedMail: action.payload,
      };

    default:
      return state;
  }
};
