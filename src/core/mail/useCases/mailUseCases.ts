import { Event, EventDate, Filter } from "../../relays/domain";

import { getMailCallback, MailData } from "../domain/models";
import { RelayPoolRepository } from "../../../infraestructure/nostr/relayPool";
import { MailRepo } from "../domain/ports";
import { ContactsUseCasesImpl } from "../../contacts/usecases/ContactsUseCases";
import {
  ProfileUseCases,
  ProfileUseCasesImpl,
} from "../../profile/useCases/ProfileUseCase";

export interface MailContentValues {
  subject: string;
  recipients: string;
  content: string;
}

export interface Listener {
  cb: getMailCallback;
  delete: () => void;
}

export interface MailUseCases {
  // getMailListTo(address: string, privkey?: string): void;
  getMails(): MailData[];
  sendMail(mail: MailContentValues): void;
}

class MailUseCasesImpl implements MailUseCases {
  private relayRepo: MailRepo;
  private static _instance: MailUseCasesImpl;
  private mails: MailData[];
  private listeners: Record<string, Listener>;

  constructor() {
    this.relayRepo = RelayPoolRepository.Repostory;
    this.mails = [];
    this.listeners = {};
    const myPubAddr: string =
      ProfileUseCasesImpl.Execute.getPublicKey() as string;
    const myPrivAddr: string =
      ProfileUseCasesImpl.Execute.getPrivateKey() as string;
    this.getMailListTo(myPubAddr, myPrivAddr);
  }
  getMails(): MailData[] {
    const mailList = [...this.mails];

    mailList.sort((a: MailData, b: MailData) => {
      return b.created_at - a.created_at;
    });

    return mailList;
  }

  addListener(mailCB: getMailCallback): Listener {
    const id = Math.random().toString().slice(2);
    const deleteListener = () => delete this.listeners[id];
    this.listeners[id] = {
      cb: mailCB,
      delete: deleteListener,
    };

    return this.listeners[id];
  }

  private notifyListeners() {
    for (const id in this.listeners) {
      this.listeners[id].cb(this.getMails());
    }
  }

  public static get Execute() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }

  publishMail = (mail: MailContentValues) => {};

  private getMailListTo = (address: string, privkey?: string): void => {
    const filter: Filter = {
      kinds: [4],
      "#p": [address],
    };
    this.relayRepo.subscribe(
      filter,
      async (event: Event) => {
        const mail: MailData = {
          id: event.id as string,
          author:
            event.author === undefined
              ? undefined
              : await ContactsUseCasesImpl.Execute.getUSerProfileInfo(
                  event.author
                ),
          title: event.content,
          content: "",
          date: event.created_at.format(),
          created_at: event.created_at.toNumber(),
        };
        this.mails.push(mail);
        this.notifyListeners();
      },
      privkey
    );
  };

  sendMail({ subject, content, recipients }: MailContentValues): void {
    const event: Event = {
      kind: 1,
      content: subject,
      tags: [],
      created_at: new EventDate(),
    };
    const pkey =
      "42f92ac20296d05c8612c114fed4f82ba36eea2c9bba53745356b922c279a915";
    this.relayRepo.sendEvent(event, pkey);
  }
}

export { MailUseCasesImpl };
