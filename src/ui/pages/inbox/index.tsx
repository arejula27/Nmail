import { useEffect, useState, useMemo } from "react";
import { MailData } from "../../../core/mail/domain/models";
import { MailUseCasesImpl } from "../../../core/mail/useCases/mailUseCases";
import { MainLayout } from "../../components/layout/";
import { action, MailFeed } from "../../components/mail";

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
  }, []);

  useMemo(() => {}, [state]);
  //

  return (
    <MainLayout>
      <div className="">
        <MailFeed mailsList={state.mails} actions={actions} />
      </div>
    </MainLayout>
  );
}
