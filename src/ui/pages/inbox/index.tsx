import { MainLayout } from "../../components/layout/";
import { action, MailFeed } from "../../components/mail";
import { useMailUSeCases } from "../../../context/mail/useCases/mailUseCases";

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
  const useMail = useMailUSeCases();
  const mailsList = useMail.getMailList();

  return (
    <MainLayout>
      <div className="">
        <MailFeed mailsList={mailsList} actions={actions} />
      </div>
    </MainLayout>
  );
}
