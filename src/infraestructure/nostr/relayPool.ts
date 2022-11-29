import {
  RelayPolicy,
  Relay as NRelay,
  RelayPool,
  relayPool,
  Event as NstEvent,
  getBlankEvent,
  PoolPublishCallback,
} from "nostr-tools";
import { Event, Relay } from "../../core/relays/domain";

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
    this.pool.addRelay("ws://localhost:2700");
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
}
