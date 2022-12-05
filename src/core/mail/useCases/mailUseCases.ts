import { Event, EventDate, Filter } from "../../relays/domain";

import { getMailCallback, MailData } from "../domain/models";
import { RelayPoolRepository } from "../../../infraestructure/nostr/relayPool";
import { MailRepo } from "../domain/ports";
import { ContactsUseCasesImpl } from "../../contacts/usecases/ContactsUseCases";

export interface MailContentValues {
  subject: string;
  recipients: string;
  content: string;
}

interface MailUseCases {
  getMailListTo(
    address: string,
    mailCb: getMailCallback,
    privkey?: string
  ): void;
  sendMail(mail: MailContentValues): void;
}

class MailUseCasesImpl implements MailUseCases {
  private relayRepo: MailRepo;
  private static _instance: MailUseCasesImpl;
  private mails: MailData[];
  constructor() {
    this.relayRepo = RelayPoolRepository.Repostory;
    this.mails = [];
  }

  public static get Execute() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }

  publishMail = (mail: MailContentValues) => {};

  getMailListTo = (
    address: string,
    mailCb: getMailCallback,
    privkey?: string
  ): void => {
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
        };
        this.mails.push(mail);
        mailCb(this.mails);
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
