import { User } from "../../contacts/domain";

export interface MailData {
  sender: User;
  title: string;
  content: string;
  id: string;
  date: string;
}

export type getMailCallback = (mail: MailData) => void;

export type feedKind = "all" | "read" | "unread";
