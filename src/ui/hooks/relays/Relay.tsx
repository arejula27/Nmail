import { relayPool, RelayPool } from "nostr-tools";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { Relay } from "../../../core/relays/domain";
import { RelaysUseCasesImpl } from "../../../core/relays/useCases/relaysUseCase";

//Context
interface ContextProps {
  //atributes
  list: Relay[];
  //method
}

const RelaysContext = createContext({} as ContextProps);
export const useRelays = () => useContext(RelaysContext);

//Provider
export interface RelaysState {
  list: Relay[];
}

const RELAYS_INITIAL_STATE: RelaysState = {
  list: RelaysUseCasesImpl.Execute.listRelays(),
};

export const RelayProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(RelayReducer, RELAYS_INITIAL_STATE);

  return (
    <RelaysContext.Provider
      value={{
        ...state,
        //atributes

        //Methods
      }}
    >
      {children}
    </RelaysContext.Provider>
  );
};

//Reducer

type RelaysActionType = {
  type: "Relay -";
};

export const RelayReducer = (
  state: RelaysState,
  action: RelaysActionType
): RelaysState => {
  switch (action.type) {
    default:
      return state;
  }
};
