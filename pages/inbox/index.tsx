import { MainLayout } from "../../components/layout/";
import { MailCard, MailFeed } from "../../components/mail";
import { Divider } from "../../components/ui";
import { MailData } from "../../interfaces";
import { getMailList } from "../../services/mail";
import { feedKind } from "../../interfaces/mail";
import { MailContext } from "../../context/mail";
import { useContext } from "react";

interface menuOption {
  title: string;

  kind: feedKind;
}

const headerMenuOptions: menuOption[] = [
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
  const mailsList = getMailList();
  const mailContext = useContext(MailContext);

  return (
    <MainLayout>
      <div className="">
        <div className="flex text-stroke px-3">
          {/*content header menu */}
          {headerMenuOptions.map((opt, idx) => (
            <button
              onClick={() => mailContext.selectFeed(opt.kind)}
              key={idx}
              className={
                (mailContext.selectedFeed === opt.kind ? "bg-accent " : "") +
                "px-3 py-1 mx-1 rounded-lg"
              }
            >
              {opt.title}
            </button>
          ))}
        </div>
        <div className="px-3">
          <Divider />
        </div>
        <MailFeed mailsList={mailsList} />
      </div>
    </MainLayout>
  );
}
