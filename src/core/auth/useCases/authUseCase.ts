import { RelayPoolRepository } from "../../relays/domain";
import { RelayPoolImpl } from "../../relays/infraestructure/relayPool";

export interface AuthUseCases {
  getPublicKey(): string | null;
  getPrivateKey(): string | null;
  setPrivateKey(key: string | null): void;
  setPublicKey(key: string | null): void;
}

const PRIVATE_KEY = "privKey";
const PUBLIC_KEY = "pubKey";

export class AuthUseCasesImpl implements AuthUseCases {
  private relayRepo: RelayPoolRepository;
  static _instance: AuthUseCases;
  constructor() {
    this.relayRepo = RelayPoolImpl.Repostory;
  }

  public static get Execute() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }

  getPublicKey = (): string | null => localStorage.getItem(PUBLIC_KEY);

  getPrivateKey = (): string | null => localStorage.getItem(PRIVATE_KEY);

  setPrivateKey(key: string | null): void {
    if (key === null) {
      this.relayRepo.setPrivateKey("");
      localStorage.removeItem(PRIVATE_KEY);
    } else {
      this.relayRepo.setPrivateKey(key);
      localStorage.setItem(PRIVATE_KEY, key);
    }
  }
  setPublicKey(key: string | null): void {
    if (key === null) {
      localStorage.removeItem(PUBLIC_KEY);
    } else {
      localStorage.setItem(PUBLIC_KEY, key);
    }
  }
}
