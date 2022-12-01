import { useState } from "react";
import { MailData } from "../../../core/mail/domain/models";
import { MailUseCasesImpl } from "../../../core/mail/useCases/mailUseCases";
import { MainLayout } from "../../components/layout/";
import { action, MailFeed } from "../../components/mail";
import { useProfile } from "../../hooks/profile/ProfileContext";

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
  const profile = useProfile();
  const [mailList, setMailList] = useState<MailData[]>([]);

  MailUseCasesImpl.Execute.getMailListTo(
    profile.publicKey!,
    (mail: MailData) => {
      const newList: MailData[] = mailList.concat([mail]);
      setMailList(newList);
    },
    profile.privateKey!
  );

  return (
    <MainLayout>
      <div className="">
        <MailFeed mailsList={mailList} actions={actions} />
      </div>
    </MainLayout>
  );
}
