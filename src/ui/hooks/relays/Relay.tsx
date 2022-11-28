import { relayPool, RelayPool } from "nostr-tools";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { Relay, relayService } from "../../../context/relays/domain";

const pool = relayPool();
pool.addRelay("wss://nostr.onsats.org");

//Context
interface ContextProps {
  //atributes
  list: Relay[];
  //method
  addRelay(relay: Relay): void;
}

const RelaysContext = createContext({} as ContextProps);
export const useRelays = () => useContext(RelaysContext);

//Provider
export interface RelaysState {
  list: Relay[];
}

const RELAYS_INITIAL_STATE: RelaysState = {
  list: [],
};

export const RelayProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(RelayReducer, RELAYS_INITIAL_STATE);

  const addRelay = (relay: Relay) => {
    dispatch({ type: "UI - add relay", relay, pool });
  };

  return (
    <RelaysContext.Provider
      value={{
        ...state,
        //atributes

        //Methods
        addRelay,
      }}
    >
      {children}
    </RelaysContext.Provider>
  );
};

//Reducer

type RelaysActionType = {
  type: "UI - add relay";
  relay: Relay;
  pool: RelayPool;
};

export const RelayReducer = (
  state: RelaysState,
  action: RelaysActionType
): RelaysState => {
  switch (action.type) {
    case "UI - add relay":
      action.pool.addRelay(action.relay.url);

      return {
        ...state,
        //list: action.pool.getRelayList(),
      };

    default:
      return state;
  }
};
