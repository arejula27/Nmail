import { MainLayout } from "../../components/layout/";
import { MailCard, MailFeed } from "../../components/mail";
import { Divider } from "../../components/ui";
import { MailData } from "../../interfaces";
import { getMailList } from "../../services/mail";
import { feedKind } from "../../interfaces/mail";
import { MailContext } from "../../context/mail";
import { useContext } from "react";

const selectedMail: MailData = {
  id: "1",
  title: "Buenas tardes.",
  sender: {
    name: "Sapo",
    imageUrl: "https://i.postimg.cc/QCWJKsmW/Dreadful-Rate226.png",
  },
  content:
    "Voluptate voluptate non ex culpa ipsum ex occaecat ea sit veniam et est pariatur. Commodo mollit est enim id reprehenderit elit sunt est elit id do. Tempor culpa cupidatat dolore dolor cupidatat proident adipisicing labore occaecat sit." +
    "\n" +
    "Voluptate voluptate non ex culpa ipsum ex occaecat ea sit veniam et est pariatur. Commodo mollit est enim id reprehenderit elit sunt est elit id do. Tempor culpa cupidatat dolore dolor cupidatat proident adipisicing labore occaecat sit." +
    "Consectetur voluptate nisi esse minim. Nostrud consectetur ex fugiat culpa cillum. Enim culpa veniam velit deserunt ex excepteur exercitation elit commodo sunt. Ea nostrud ea ex exercitation veniam. Sunt in laborum aute quis in pariatur esse. Officia ut quis officia consectetur duis.",
};

interface menuOption {
  title: string;
  onClick: Function;
  kind: feedKind;
}

const headerMenuOptions: menuOption[] = [
  {
    title: "All",
    kind: "all",

    onClick: () => {},
  },
  {
    title: "Read",
    kind: "read",
    onClick: () => {},
  },
  {
    title: "Unread",
    kind: "unread",
    onClick: () => {
      console.log("sapo");
    },
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
        <MailFeed mailsList={mailsList} selectedMail={selectedMail} />
      </div>
    </MainLayout>
  );
}
