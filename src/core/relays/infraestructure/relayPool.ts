import {
  RelayPolicy,
  Relay as NRelay,
  RelayPool,
  relayPool,
  Event as NstEvent,
  getBlankEvent,
  getEventHash,
  signEvent,
  PoolPublishCallback,
} from "nostr-tools";
import { Relay, Event } from "../domain";
import { RelayPoolRepository } from "../domain/ports";

interface NRelaysAndPolicy {
  relay: NRelay;
  policy: RelayPolicy;
}

type NPool = RelayPool & { relays: NRelaysAndPolicy[] };

type NEvent = NstEvent & { signature?: string; id?: string };

export class RelayPoolImpl implements RelayPoolRepository {
  private static _instance: RelayPoolImpl;
  pool: NPool = relayPool() as NPool;

  private constructor() {
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
    pubkey: string,
    privkey: string
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
    nevent.created_at = new Date().valueOf();
    //assign id
    nevent.id = getEventHash(nevent);
    //Sign
    nevent.signature = (await signEvent(nevent, privkey)) as unknown as string;
    const cb: PoolPublishCallback = (status, relay) => {
      console.log(status + " " + relay);
    };
    this.pool.publish(nevent, cb);
  }
}
