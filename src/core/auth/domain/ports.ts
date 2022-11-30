import { Filter, Event } from "../../relays/domain";

export interface AuthRepo {
  setPrivateKey(key: string): void;
  getEvents(filter: Filter): Promise<Event>;
}
