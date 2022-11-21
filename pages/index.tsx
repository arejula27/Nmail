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

export default function Home() {
  const mailList = getMailList();

  return (
    <MainLayout>
      <div className=" m-4">
        <div className="flex text-stroke">
          <button
            className=" rounded-full  hover:bg-hover m-1"
            onClick={() => {}}
          >
            <LeftArrowIcon width={30} height={30} />
          </button>
          <button
            className=" rounded-full  hover:bg-hover m-1"
            onClick={() => {}}
          >
            <RightArrowIcon width={30} />
          </button>
        </div>
        <Divider />
        <div className="flex ">
          {/**List of mails */}
          <div className=" w-1/2 h-screen overflow-scroll">
            {mailList.map((mail, idx) => (
              <>
                <MailCard
                  mail={mail}
                  key={idx}
                  selected={selectedMail.id === mail.id}
                />
              </>
            ))}
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
