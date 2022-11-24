import Head from "next/head";
import React, {
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Divider, DrawerMenu } from "../ui";

//SVGs
import MailIcon from "../../public/mail.svg";
import MenuIcon from "../../public/menu.svg";
import InboxIcon from "../../public/inbox.svg";
import DraftIcon from "../../public/draft.svg";
import SendIcon from "../../public/send.svg";
import ContactsIcon from "../../public/contacts.svg";
import SettingsIcon from "../../public/settings.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import { NewMessageModal } from "../mail/NewMessageModal";
import { UIContext } from "../../context/UI";
import { MailContext } from "../../context/mail";

type Props = PropsWithChildren & {
  title?: string;
};
interface menuOption {
  name: string;
  icon: any;
  divider?: boolean;
  route: string;
}

//TODO: usar context para gestionar la opción escogida
const selectedOption = "Inbox";
const imageUrl = "https://i.postimg.cc/QCWJKsmW/Dreadful-Rate226.png";
const usrName = "arejula27";

const menuOptions: menuOption[] = [
  {
    name: "Inbox",
    icon: <InboxIcon width={30} />,
    route: "/inbox",
  },
  {
    name: "Drafts",
    icon: <DraftIcon width={30} />,
    route: "/drafts",
  },
  {
    name: "Sent",
    icon: <SendIcon width={30} />,
    divider: true,
    route: "/sent",
  },
  {
    name: "Contacts",
    icon: <ContactsIcon width={30} />,
    route: "contacts",
  },
  {
    name: "Settings",
    icon: <SettingsIcon width={30} />,
    route: "settings",
  },
];

export const MainLayout: FC<Props> = ({ children, title = "Nmail" }) => {
  const md = 768;
  //arbitrary pixels, they will be changed once the element
  //is mounted on the DOM
  const [windowDimenion, detectHW] = useState({
    winWidth: 10000,
    winHeight: 100000,
  });

  //nexjs use SSR, i cannt get the dimension on the server
  //this state is used for chcking if i'm on the client
  const [mounted, setMounted] = useState(false);

  const detectSize = () => {
    if (typeof window !== "undefined") {
      detectHW({
        winWidth: window.innerWidth,
        winHeight: window.innerHeight,
      });
    }
  };

  useEffect(() => {
    //listed al the window redimensions
    window.addEventListener("resize", detectSize);
    if (!mounted) {
      setMounted(true);
      detectSize();
    }

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [mounted, windowDimenion]);

  const uiContext = useContext(UIContext);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="fixed h-screen bg-background ">
        {uiContext.menuDrawerShowed && windowDimenion.winWidth < md ? (
          <div className="   z-5">
            <DrawerMenu>
              <SideBarContent />
            </DrawerMenu>
          </div>
        ) : null}

        {/* header*/}
        <div className="">
          <div className="   w-screen ">
            <HeaderContent />
          </div>
          <div className="flex  ">
            {/*sidebar */}
            <aside className=" overflow-scroll  invisible  px-4 md:visible  w-72 xl:w-96 fixed left-0 border-r  h-[80vh] border-stroke border-opacity-10">
              <SideBarContent />
            </aside>
            {/* content*/}
            <div className="  md:pl-72 xl:pl-96">{children}</div>
          </div>
        </div>
        {uiContext.newMessageModalShowed ? <NewMessageModal /> : null}
      </div>
    </>
  );
};

const SideBarContent = () => {
  const router = useRouter();
  const uiContext = useContext(UIContext);
  const path = router.pathname;

  return (
    <>
      <div className="w-full   ">
        {/* new message button*/}
        <button
          className="py-3 rounded-lg text-center my-3  bg-primary  hover:bg-hover w-full"
          onClick={() => {
            uiContext.showNewMessageModal(true);
          }}
        >
          New Message
        </button>
        {/*  menu */}
        {menuOptions.map((opt) => (
          <div key={opt.name} className={"text-paragraph"}>
            <Link href={opt.route}>
              <button
                className={
                  (path === opt.route
                    ? "  bg-accent text-bold  "
                    : " hover:bg-hover ") + " my-1  w-full py-2 rounded-lg"
                }
                onClick={() => {}}
              >
                <div className="flex items-center">
                  <div className="mx-2 ">{opt.icon}</div>
                  {opt.name}
                </div>
              </button>
            </Link>
            {opt.divider ? <Divider /> : null}
          </div>
        ))}
      </div>
    </>
  );
};

const HeaderContent = () => {
  const uiContext = useContext(UIContext);
  return (
    <div className="  flex flex-grow items-center justify-between px-3 mt-2  ">
      <button
        className="block md:hidden hover:bg-hover p-2 rounded-full"
        onClick={() => {
          uiContext.showMenuDrawer(true);
        }}
      >
        <MenuIcon width={40} />
      </button>
      <div className="hidden md:block ">
        {/* title and logo*/}
        <div className="flex items-center  text-headline">
          <MailIcon width={40} />

          <h1 className="text-white font-bold text-2xl pl-5">Nmail</h1>
        </div>
      </div>
      {/*Perfil */}
      <button
        onClick={() => {}}
        className="flex items-center font-bold rounded-xl p-2 hover:bg-hover "
      >
        {usrName}
        <img
          src={imageUrl}
          alt={""}
          width={50}
          height={50}
          className={"rounded-full ml-3"}
        />
      </button>
    </div>
  );
};
