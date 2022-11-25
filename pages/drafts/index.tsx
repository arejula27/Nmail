import { MainLayout } from "../../components/layout/";
import { MailFeed } from "../../components/mail";
import { getMailList } from "../../services/mail";

export default function DraftPage() {
  const mailsList = getMailList();

  return (
    <MainLayout>
      <MailFeed mailsList={mailsList} actions={[]} />
    </MainLayout>
  );
}
