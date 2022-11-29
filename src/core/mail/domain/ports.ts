import { Event } from "../../relays/domain";

export interface MailRepo {
  sendEvent(event: Event, pubkey: string): Promise<void>;
}
