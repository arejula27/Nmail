import { RelayPolicy } from "nostr-tools";
import { Event } from "./event";
import { Relay } from "./relay";

export interface RelayPoolRepository {
  addRelay(url: string): void;
  listRelays(): Relay[];
  sendEvent(event: Event, pubkey: string, privkey: string): void;
  setPrivateKey(key: string): void;
}
