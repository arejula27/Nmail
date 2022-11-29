import { MailUSeCasesImpl } from "../../../core/mail/useCases/mailUseCases";
import { MainLayout } from "../../components/layout/";
import { action, MailFeed } from "../../components/mail";

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
  const mailsList = MailUSeCasesImpl.Execute.getMailList();

  return (
    <MainLayout>
      <div className="">
        <MailFeed mailsList={mailsList} actions={actions} />
      </div>
    </MainLayout>
  );
}
