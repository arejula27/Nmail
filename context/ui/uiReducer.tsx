import { UIState } from ".";
import { feedKind } from "../../interfaces";

type UIActionType = { type: "UI - Select feed"; payload: feedKind };

export const UiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case "UI - Select feed":
      return {
        ...state,
        selectedFeed: action.payload,
      };

    default:
      return state;
  }
};
