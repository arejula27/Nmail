import { createContext } from "react";
import { feedKind } from "../../interfaces";

interface ContextProps {
  selectedFeed: feedKind;

  //Methods
  selectFeed: (feed: feedKind) => void;
}

export const UIContext = createContext({} as ContextProps);
