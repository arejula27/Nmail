import * as secp256k1 from "@noble/secp256k1";

import {
  RelayPolicy,
  Relay as NRelay,
  RelayPool,
  relayPool,
  Event as NstEvent,
  getBlankEvent,
  PoolPublishCallback,
  SubscriptionOptions,
} from "nostr-tools";
import { Event, Relay, Filter } from "../../core/relays/domain";
import { decrypt } from "../nip5";

interface NRelaysAndPolicy {
  relay: NRelay;
  policy: RelayPolicy;
}

type NPool = RelayPool & { relays: NRelaysAndPolicy[] };

type NEvent = NstEvent & { signature?: string; id?: string };

export class RelayPoolRepository {
  private static _instance: RelayPoolRepository;
  pool: NPool;

  private constructor() {
    this.pool = relayPool() as NPool;
    this.pool.addRelay("wss://nostr.onsats.org");
    //this.pool.addRelay("ws://localhost:2700");
  }

  public static get Repostory() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }

  addRelay(url: string): void {
    this.pool.addRelay(url);
  }
  listRelays(): Relay[] {
    return Object.values(this.pool.relays).map((r: NRelaysAndPolicy) => {
      return { url: r.relay.url, policy: r.policy };
    });
  }
  async sendEvent(
    { kind, content, tags }: Event,
    pubkey: string
  ): Promise<void> {
    var nevent: NEvent = getBlankEvent();
    //Fill event fields
    nevent = {
      ...nevent,
      kind: kind,
      content: content,
      tags: tags,
      pubkey: pubkey,
    };
    //assign created at
    nevent.created_at = Math.floor(Date.now().valueOf() / 1000);

    const cb: PoolPublishCallback = (status, relay) => {
      if (status === 1) {
        console.log(relay + " saved the event");
      } else if (status === -1) {
        console.log(relay + " didn't save the event");
      }
    };
    this.pool.publish(nevent, cb);
  }

  setPrivateKey(key: string): void {
    this.pool.setPrivateKey(key);
  }

  async getEvents(filter: Filter): Promise<Event> {
    var eventRcv: NEvent = {
      kind: 0,
      content: "",
      tags: [],
      created_at: 0,
    };

    var rsl: (value: unknown) => void;
    const opts: SubscriptionOptions = {
      cb: function (event: NstEvent, relay: string): void {
        eventRcv = event;
        console.log("event receive form " + relay);
        rsl(0);
      },
      filter: {
        ids: filter.ids as string[],
        kinds: filter.kinds as number[],
        authors: filter.authors as string[],
        since: filter.since as number,
        until: filter.until as number,
        "#e": filter["#e"] as string[],
        "#p": filter["#p"] as string[],
      },
      skipVerification: false,
    };

    const subscription = this.pool.sub(opts);
    await new Promise((r) => {
      rsl = r;
    });

    subscription.unsub();

    const res: Event = {
      kind: eventRcv.kind,
      content: eventRcv.content,
      tags: eventRcv.tags,
    };

    return res;
  }

  async subscribeCypher(filter: Filter, pubkey: string, privkey: string) {
    const opts: SubscriptionOptions = {
      cb: function (event: NstEvent, relay: string): void {
        //TODO
        const msg: string = decrypt(privkey, pubkey, event.content);
        console.log(msg);
      },
      filter: {
        ids: filter.ids as string[],
        kinds: filter.kinds as number[],
        authors: filter.authors as string[],
        since: filter.since as number,
        until: filter.until as number,
        "#e": filter["#e"] as string[],
        "#p": filter["#p"] as string[],
      },
      skipVerification: false,
    };

    const subscription = this.pool.sub(opts);
  }
}
