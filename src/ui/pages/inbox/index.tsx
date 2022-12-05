import { resolve } from "path";
import { useEffect, useState } from "react";
import { MailData } from "../../../core/mail/domain/models";
import { MailUseCasesImpl } from "../../../core/mail/useCases/mailUseCases";
import { MainLayout } from "../../components/layout/";
import { action, MailFeed } from "../../components/mail";
import { useProfile } from "../../hooks/profile/ProfileContext";
import { MailList } from "../../components/mail/MailList";

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
  const [state, setState] = useState<{ mails: MailData[] }>({
    mails: [],
  });

  useEffect(() => {
    setState({ mails: MailUseCasesImpl.Execute.getMails() });
    const sub = MailUseCasesImpl.Execute.addListener((mails: MailData[]) => {
      setState({ mails });
    });

    return () => {
      sub.delete();
    };
  });

  return (
    <MainLayout>
      <div className="">
        <MailFeed mailsList={state.mails} actions={actions} />
      </div>
    </MainLayout>
  );
}
