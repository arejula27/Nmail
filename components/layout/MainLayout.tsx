import Head from "next/head";
import React, { FC, PropsWithChildren } from "react";
import { Divider } from "../ui";

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
  return (
    <div className="fixed">
      <Head>
        <title>{title}</title>
      </Head>
      {/* header*/}
      <div className="   w-screen ">{headerContent()}</div>
      <div className="flex  ">
        {/*sidebar */}
        <aside className=" overflow-scroll  invisible  px-4 md:visible  w-72 xl:w-96 fixed left-0 border-r  h-[80vh] border-stroke border-opacity-10">
          {SideBarContent()}
        </aside>
        {/* content*/}
        <div className="  md:pl-72 xl:pl-96">{children}</div>
      </div>
    </div>
  );
};

const SideBarContent = () => {
  const router = useRouter();

  const path = router.pathname;

  return (
    <>
      <div className="w-full   ">
        {/* new message button*/}
        <button
          className="py-3 rounded-lg text-center my-3 bg-primary  hover:bg-hover w-full"
          onClick={() => {}}
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

const headerContent = () => {
  return (
    <div className="  flex flex-grow items-center justify-between px-3 ">
      <MenuIcon width={40} className="block md:hidden" />
      <div className="hidden md:block">
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
