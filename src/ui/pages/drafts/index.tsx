import { MainLayout } from "../../components/layout/";
import { MailFeed } from "../../components/mail";
import { useMailUSeCases } from "../../../core/mail/useCases/mailUseCases";

export default function DraftPage() {
  const useMail = useMailUSeCases();
  const mailsList = useMail.getMailList();

  return (
    <MainLayout>
      <MailFeed mailsList={mailsList} actions={[]} />
    </MainLayout>
  );
}
