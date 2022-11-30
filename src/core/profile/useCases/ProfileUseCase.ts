import { RelayPoolRepository } from "../../../infraestructure/nostr/relayPool";
import { User } from "../domain";
import { ProfileRepo } from "../domain/ports";

export interface ProfileUseCases {
  getPublicKey(): string | null;
  getPrivateKey(): string | null;
  setPrivateKey(key: string | null): void;
  setPublicKey(key: string | null): void;
  getUSerProfileInfo(): Promise<User>;
}

const PRIVATE_KEY = "privKey";
const PUBLIC_KEY = "pubKey";

export class ProfileUseCasesImpl implements ProfileUseCases {
  private relayRepo: ProfileRepo;
  static _instance: ProfileUseCases;
  constructor() {
    this.relayRepo = RelayPoolRepository.Repostory;
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

  async getUSerProfileInfo(): Promise<User> {
    const event = await this.relayRepo.getEvents({
      kinds: [0],
      authors: [
        "42f92ac20296d05c8612c114fed4f82ba36eea2c9bba53745356b922c279a915",
      ],
    });

    const user: User = JSON.parse(event.content);

    console.log(user);

    return user;
  }
}
