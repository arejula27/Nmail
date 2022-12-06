import { useEffect, useState, useMemo } from "react";
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
  const useAuth = useProfile();
  const [state, setState] = useState<{ mails: MailData[] }>({
    mails: [],
  });

  useEffect(() => {
    MailUseCasesImpl.Execute.getMailListTo(
      useAuth.publicKey!,
      useAuth.privateKey!
    );
    setState({ mails: MailUseCasesImpl.Execute.getMails() });

    const sub = MailUseCasesImpl.Execute.addListener((mails: MailData[]) => {
      setState({ mails });
    });

    return () => {
      sub.delete();
    };
  }, [useAuth.privateKey]);

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
