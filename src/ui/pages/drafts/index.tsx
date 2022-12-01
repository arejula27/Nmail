import { MailUseCasesImpl } from "../../../core/mail/useCases/mailUseCases";
import { MainLayout } from "../../components/layout/";
import { MailFeed } from "../../components/mail";

export default function DraftPage() {
  return (
    <MainLayout>
      <MailFeed mailsList={[]} actions={[]} />
    </MainLayout>
  );
}
