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

type Props = PropsWithChildren & {
  title?: string;
};
interface menuOption {
  name: string;
  icon: any;
  divider?: boolean;
}

//TODO: usar context para gestionar la opción escogida
const selectedOption = "Inbox";

const menuOptions: menuOption[] = [
  {
    name: "Inbox",
    icon: <InboxIcon width={30} />,
  },
  {
    name: "Drafts",
    icon: <DraftIcon width={30} />,
  },
  {
    name: "Sent",
    icon: <SendIcon width={30} />,
    divider: true,
  },
  {
    name: "Contacts",
    icon: <ContactsIcon width={30} />,
  },
  {
    name: "Settings",
    icon: <SettingsIcon width={30} />,
  },
];

export const MainLayout: FC<Props> = ({ children, title = "Nmail" }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {/* header*/}
      <div className="   mx-5 mt-4  ">{headerContent()}</div>
      <div className="flex ">
        {/*sidebar */}
        <aside className=" ease-in duration-200  opacity-0  md:opacity-100  w-72 xl:w-96 transition-all fixed left-0 ">
          {sideBarContent()}
        </aside>
        {/* content*/}
        <div className=" w-full md:pl-72 xl:pl-96">{children}</div>
      </div>
    </>
  );
};

const sideBarContent = () => {
  return (
    <>
      <div className="w -full  px-4 ">
        {/* new message button*/}
        <button
          className="py-3 rounded-lg text-center my-3 bg-card-background text-paragraph hover:opacity-60 w-full"
          onClick={() => {}}
        >
          New Message
        </button>
        {/*  menu */}
        {menuOptions.map((opt) => (
          <div key={opt.name}>
            <button
              className={
                selectedOption === opt.name
                  ? "py-2 rounded-lg  bg-gray-light text-bold text-paragraph hover:opacity-60 w-full"
                  : "py-2 rounded-lg   text-paragraph hover:opacity-60 w-full"
              }
              onClick={() => {}}
            >
              <div className="flex items-center">
                <div className="stroke-paragraph mx-2 ">{opt.icon}</div>
                {opt.name}
              </div>
            </button>
            {opt.divider ? <Divider /> : null}
          </div>
        ))}
      </div>
    </>
  );
};

const headerContent = () => {
  return (
    <div className="  flex flex-grow items-center justify-between ">
      <MenuIcon width={40} className="block md:hidden" />
      <div className="hidden md:block">
        {/* title and logo*/}
        <div className="flex items-center  text-headline">
          <MailIcon width={40} />

          <h1 className="text-white font-bold text-2xl pl-5">Nmail</h1>
        </div>
      </div>
      {/*Perfil */}
      <div>Perfil</div>
    </div>
  );
};
