import { Relay, RelayPolicy } from "../domain";
import { RelayPoolRepository } from "../domain/ports";
import { RelayPoolImpl } from "../infraestructure/relayPool";

interface RelayUseCases {
  addRelay(url: string, policy: RelayPolicy | undefined): void;
  listRelays(): Relay[];
}

export class RelaysUseCasesImpl implements RelayUseCases {
  relayRepo: RelayPoolRepository;
  private static _instance: RelaysUseCasesImpl;
  constructor() {
    this.relayRepo = RelayPoolImpl.Repostory;
  }

  public static get Execute() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }

  listRelays(): Relay[] {
    return this.relayRepo.listRelays();
  }

  addRelay(url: string, policy: RelayPolicy | undefined): void {
    const relay: Relay = {
      url,
      policy: !policy
        ? {
            read: true,
            write: true,
          }
        : policy,
    };
    this.relayRepo.addRelay(url);
  }
}
