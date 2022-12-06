import { Filter, Event } from "../../relays/domain";

export interface ProfileRepo {
  setPrivateKey(key: string): void;
  getEvents(filter: Filter): Promise<Event>;
  unsubscribe(): void;
}
