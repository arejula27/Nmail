import { User } from "../../users/domain";


export interface MailData {
    sender :User,
    title:string,
    content:string,
    id:string
    date:string
}

export type feedKind = "all" | "read" | "unread";