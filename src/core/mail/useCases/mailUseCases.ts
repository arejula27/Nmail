import { Event, RelayPoolRepository } from "../../relays/domain";
import { RelayPoolImpl } from "../../relays/infraestructure/relayPool";
import { MailData } from "../domain/mail";
import { MailContent } from "../../../ui/components/mail/MailContent";

export interface MailContentValues {
  subject: string;
  recipients: string;
  content: string;
}

interface MailUseCases {
  getMailList(): MailData[];
  sendMail(mail: MailContentValues): void;
}

class MailUseCasesImpl implements MailUseCases {
  private relayRepo: RelayPoolRepository;
  private static _instance: MailUseCasesImpl;
  constructor() {
    this.relayRepo = RelayPoolImpl.Repostory;
  }

  public static get Execute() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }

  publishMail = (mail: MailContentValues) => {};

  getMailList = (): MailData[] => {
    const fake: MailData = {
      id: "2",
      title: "Hola buenas tardes, que tal estas",
      sender: {
        name: "Kafka",
        imageUrl: "https://i.postimg.cc/QCWJKsmW/Dreadful-Rate226.png",
      },
      content:
        "Voluptate voluptate non ex culpa ipsum ex occaecat ea sit veniam et est pariatur. Commodo mollit est enim id reprehenderit elit sunt est elit id do. Tempor culpa cupidatat dolore dolor cupidatat proident adipisicing labore occaecat sit." +
        "\n" +
        "Voluptate voluptate non ex culpa ipsum ex occaecat ea sit veniam et est pariatur. Commodo mollit est enim id reprehenderit elit sunt est elit id do. Tempor culpa cupidatat dolore dolor cupidatat proident adipisicing labore occaecat sit." +
        "Consectetur voluptate nisi esse minim. Nostrud consectetur ex fugiat culpa cillum. Enim culpa veniam velit deserunt ex excepteur exercitation elit commodo sunt. Ea nostrud ea ex exercitation veniam. Sunt in laborum aute quis in pariatur esse. Officia ut quis officia consectetur duis.",

      date: "20/11/2022",
    };
    return [fake];
  };

  sendMail({ subject, content, recipients }: MailContentValues): void {
    const event: Event = {
      kind: 1,
      content: subject,
      tags: [],
    };
    const pkey =
      "42f92ac20296d05c8612c114fed4f82ba36eea2c9bba53745356b922c279a915";
    this.relayRepo.sendEvent(event, pkey);
  }
}

export { MailUseCasesImpl };
