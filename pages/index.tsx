import { MainLayout } from "../components/layout/";
import { MailCard } from "../components/mail";
import { Divider } from "../components/ui";
import { MailData } from "../models";
import { getMailList } from "../services/mail";
import LeftArrowIcon from "../public/arrow-left.svg";
import RightArrowIcon from "../public/arrow-right.svg";

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
    "Consectetur voluptate nisi esse minim. Nostrud consectetur ex fugiat culpa cillum. Enim culpa veniam velit deserunt ex excepteur exercitation elit commodo sunt. Ea nostrud ea ex exercitation veniam. Sunt in laborum aute quis in pariatur esse. Officia ut quis officia consectetur duis.",
};

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

export default function Home() {
  const mailList = getMailList();

  return (
    <MainLayout>
      <div className=" px-3">
        <div className="flex text-stroke">{}</div>
        {/*content header menu */}
        {headerMenuOptions.map((opt, idx) => (
          <button
            key={idx}
            className={
              (opt.title === selectedFeed ? "bg-accent " : "") +
              "px-3 py-1 mx-1 rounded-lg"
            }
          >
            {opt.title}
          </button>
        ))}
        <Divider />
        <div className="flex ">
          {/**List of mails */}
          <div className=" w-1/2 h-[80vh] ">
            <div className="m-3  h-full overflow-scroll">
              {mailList.map((mail, idx) => (
                <MailCard
                  mail={mail}
                  key={idx}
                  selected={selectedMail.id === mail.id}
                />
              ))}
            </div>
          </div>
          {/**Mail content */}
          <div className="m-4 w-1/2 ">
            <h1 className="text-3xl font-bold mb-4">{selectedMail.title}</h1>
            <div>{selectedMail.content}</div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
