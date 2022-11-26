import { MainLayout } from "../../components/layout/";
import { MailFeed } from "../../components/mail";
import { getMailList } from "../../../context/mail/application";

export default function DraftPage() {
  const mailsList = getMailList();

  return (
    <MainLayout>
      <MailFeed mailsList={mailsList} actions={[]} />
    </MainLayout>
  );
}
