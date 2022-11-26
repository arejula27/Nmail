import { MainLayout } from "../../components/layout/";
import { MailFeed } from "../../components/mail";

import { getMailList } from "../../../context/mail/application";

export default function SentPage() {
  const mailsList = getMailList();

  return (
    <MainLayout>
      <MailFeed mailsList={mailsList} actions={[]} />
    </MainLayout>
  );
}
