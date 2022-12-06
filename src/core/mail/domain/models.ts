import { User } from "../../contacts/domain";
import { MailContent } from "../../../ui/components/mail/MailContent";
import { title } from "process";

enum keys {
  title = "title: ",
}
export interface MailData {
  author?: User;
  mail: Mail;
  id: string;
  date: string;
  created_at: number;
}

export interface Mail {
  title: string;
  content: string;
}

export const MailToString = (mail: Mail): string => {
  return keys.title + mail.title + "\n" + mail.content;
};

export const GetMailFromString = (text: string): Mail | undefined => {
  var title: string | undefined;
  var content: string = "";

  var lines = text.split("\n");
  lines.forEach((line) => {
    if (line.startsWith(keys.title)) {
      title = line.replace(keys.title, "");
    } else {
      content += line + "\n";
    }
  });

  if (!title) return undefined;
  return { title: title, content: content };
};

export type getMailCallback = (mails: MailData[]) => void;

export type feedKind = "all" | "read" | "unread";
