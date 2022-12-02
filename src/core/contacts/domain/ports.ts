import { Filter, Event } from "../../relays/domain";

export interface ContactsRepo {
  getEvents(filter: Filter): Promise<Event>;
}
