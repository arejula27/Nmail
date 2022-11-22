import { MainLayout } from "../../components/layout/";
import { action, MailCard, MailFeed } from "../../components/mail";
import { Divider } from "../../components/ui";
import { MailData } from "../../interfaces";
import { getMailList } from "../../services/mail";
import { feedKind } from "../../interfaces/mail";
import { MailContext } from "../../context/mail";
import { useContext } from "react";

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
  const mailContext = useContext(MailContext);

  return (
    <MainLayout>
      <div className="">
        <MailFeed mailsList={mailsList} actions={actions} />
      </div>
    </MainLayout>
  );
}
