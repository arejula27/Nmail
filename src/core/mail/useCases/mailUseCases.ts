import { Event, EventDate, Filter } from "../../relays/domain";

import {
  getMailCallback,
  GetMailFromString,
  MailData,
  MailToString,
} from "../domain/models";
import { RelayPoolRepository } from "../../../infraestructure/nostr/relayPool";
import { MailRepo } from "../domain/ports";
import { ContactsUseCasesImpl } from "../../contacts/usecases/ContactsUseCases";
import { title } from "process";
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
  sendMail(mail: MailContentValues, pubkey: string): void;
  clearMailList(): void;
}

class MailUseCasesImpl implements MailUseCases {
  private relayRepo: MailRepo;
  private static _instance: MailUseCasesImpl;
  private mails: MailData[];
  private listeners: Record<string, Listener>;
  private profileUseCase: ProfileUseCases;

  constructor() {
    this.relayRepo = RelayPoolRepository.Repostory;
    this.mails = [];
    this.listeners = {};
    this.profileUseCase = ProfileUseCasesImpl.Execute;
  }
  getMails(): MailData[] {
    const mailList = [...this.mails];

    //sort mails by date (the most new first)
    mailList.sort((a: MailData, b: MailData) => {
      return b.created_at - a.created_at;
    });

    return mailList;
  }

  addListener(mailCB: getMailCallback): Listener {
    const id = Math.random().toString().slice(2);
    const deleteListener = () => {
      delete this.listeners[id];
    };
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

  getMailListTo = (address: string, privkey?: string): void => {
    const filter: Filter = {
      kinds: [4],
      "#p": [address],
    };
    this.relayRepo.subscribe(
      filter,
      async (event: Event) => {
        const mailCont = GetMailFromString(event.content);
        if (mailCont) {
          const mail: MailData = {
            id: event.id as string,
            author:
              event.author === undefined
                ? undefined
                : await ContactsUseCasesImpl.Execute.getUSerProfileInfo(
                    event.author
                  ),
            mail: mailCont,
            date: event.created_at.format(),
            created_at: event.created_at.toNumber(),
          };

          this.mails.push(mail);
          this.notifyListeners();
        }
      },
      privkey
    );
  };

  sendMail(
    { subject, content, recipients }: MailContentValues,
    pubkey: string
  ): void {
    const privkey = this.profileUseCase.getPrivateKey() as string;
    const event: Event = {
      kind: 4,
      content: MailToString({ title: subject, content: content }),
      tags: [["p", recipients]],
      created_at: new EventDate(),
    };

    this.relayRepo.sendEvent(event, pubkey, privkey);
  }

  clearMailList(): void {
    this.mails = [];
  }
}

export { MailUseCasesImpl };
