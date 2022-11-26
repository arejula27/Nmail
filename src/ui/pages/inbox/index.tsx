import { MainLayout } from "../../components/layout/";
import { action, MailFeed } from "../../components/mail";
import { getMailList } from "../../../context/mail/application";

const actions: action[] = [
  {
    title: "All",
    kind: "all",
  },
  {
    title: "Read",
    kind: "read",
  },
  {
    title: "Unread",
    kind: "unread",
  },
];

export default function InboxPage() {
  const mailsList = getMailList();

  return (
    <MainLayout>
      <div className="">
        <MailFeed mailsList={mailsList} actions={actions} />
      </div>
    </MainLayout>
  );
}
