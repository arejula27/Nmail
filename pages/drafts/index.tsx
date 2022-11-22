import { MainLayout } from "../../components/layout/";
import { MailCard, MailFeed } from "../../components/mail";
import { Divider } from "../../components/ui";
import { MailData } from "../../interfaces";
import { getMailList } from "../../services/mail";

const selectedFeed = "All";

interface menuOption {
  title: string;
  onClick: Function;
}

const headerMenuOptions: menuOption[] = [
  {
    title: "All",
    onClick: () => {},
  },
  {
    title: "Read",
    onClick: () => {},
  },
  {
    title: "Unread",
    onClick: () => {},
  },
];

export default function DraftPage() {
  const mailsList = getMailList();
  const selectedMail = mailsList[1];

  return (
    <MainLayout>
      <MailFeed mailsList={mailsList} selectedMail={selectedMail} />
    </MainLayout>
  );
}
