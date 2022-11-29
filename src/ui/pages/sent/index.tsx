import { MailUSeCasesImpl } from "../../../core/mail/useCases/mailUseCases";
import { MainLayout } from "../../components/layout/";
import { MailFeed } from "../../components/mail";

export default function SentPage() {
  const mailsList = MailUSeCasesImpl.Execute.getMailList();

  return (
    <MainLayout>
      <MailFeed mailsList={mailsList} actions={[]} />
    </MainLayout>
  );
}
