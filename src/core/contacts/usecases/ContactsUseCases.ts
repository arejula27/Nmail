import { RelayPoolRepository } from "../../../infraestructure/nostr/relayPool";
import { ContactsRepo, User } from "../domain";

export interface ContactUseCases {
  getUSerProfileInfo(pubkey: string): Promise<User>;
}

export class ContactsUseCasesImpl implements ContactUseCases {
  private relayRepo: ContactsRepo;
  static _instance: ContactUseCases;
  private cachedContacts: Record<string, User> = {};

  constructor() {
    this.relayRepo = RelayPoolRepository.Repostory;
  }

  public static get Execute() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }

  async getUSerProfileInfo(pubkey: string): Promise<User> {
    if (this.cachedContacts[pubkey]) {
      return this.cachedContacts[pubkey];
    }

    const event = await this.relayRepo.getEvents({
      kinds: [0],
      authors: [pubkey],
    });

    const user: User = JSON.parse(event.content);
    this.cachedContacts[pubkey] = user;
    return user;
  }
}
