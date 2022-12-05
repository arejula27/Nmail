import { Event, Filter, subscriptionCallBack } from "../../relays/domain";

export interface MailRepo {
  sendEvent(event: Event, pubkey: string, privkey?: string): Promise<void>;
  subscribe(filter: Filter, cb: subscriptionCallBack, privkey?: string): void;
}
