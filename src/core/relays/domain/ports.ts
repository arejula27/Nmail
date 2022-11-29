import { Event } from "./event";
import { Relay } from "./relay";

export interface RelaysRepository {
  addRelay(url: string): void;
  listRelays(): Relay[];
}
