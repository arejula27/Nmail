import { User } from "../../contacts/domain";

export interface MailData {
  author?: User;
  title: string;
  content: string;
  id: string;
  date: string;
}

export type getMailCallback = (mails: MailData[]) => void;

export type feedKind = "all" | "read" | "unread";
