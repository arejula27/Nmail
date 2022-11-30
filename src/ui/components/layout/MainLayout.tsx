import React, {
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Divider, DrawerMenu } from "../ui";

//SVGs
import MailIcon from "../../../assets/mail.svg";
import MenuIcon from "../../../assets/menu.svg";
import InboxIcon from "../../../assets/inbox.svg";
import DraftIcon from "../../../assets/draft.svg";
import SendIcon from "../../../assets/send.svg";
import ContactsIcon from "../../../assets/contacts.svg";
import SettingsIcon from "../../../assets/settings.svg";

import { NewMessageModal } from "../mail/NewMessageModal";
import { UIContext } from "../../../core/UI/service/UIContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../../hooks/auth/AuthContext";
import { AuthUseCasesImpl } from "../../../core/auth/useCases/authUseCase";
import { User } from "../../../core/auth/domain";

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

const menuOptions: menuOption[] = [
  {
    name: "Inbox",
    icon: <img src={InboxIcon} width={30} alt={"Inbox icon"} />,
    route: "/inbox",
  },
  {
    name: "Drafts",
    icon: <img src={DraftIcon} width={30} alt={"Draft icon"} />,
    route: "/drafts",
  },
  {
    name: "Sent",
    icon: <img src={SendIcon} width={30} alt={"Send icon"} />,
    divider: true,
    route: "/sent",
  },
  {
    name: "Contacts",
    icon: <img src={ContactsIcon} width={30} alt={"Contacts icon"} />,
    route: "/contacts",
  },
  {
    name: "Settings",
    icon: <img src={SettingsIcon} width={30} alt={"Inbox icon"} />,
    route: "/settings",
  },
];

export const MainLayout: FC<Props> = ({ children, title = "Nmail" }) => {
  const md = 768;
  //arbitrary pixels, they will be changed once the element
  //is mounted on the DOM
  const [windowDimenion, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
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
            <div className="  md:pl-72 xl:pl-96 w-full">{children}</div>
          </div>
        </div>
        {uiContext.newMessageModalShowed ? <NewMessageModal /> : null}
      </div>
    </>
  );
};

const SideBarContent = () => {
  //const router = useRouter();
  const uiContext = useContext(UIContext);
  const path = location.pathname;

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
        {menuOptions.map((opt, idx) => {
          return (
            <div key={idx} className={"text-paragraph"}>
              <Link to={opt.route}>
                <button
                  onClick={() => {}}
                  className={
                    (path === opt.route
                      ? "  bg-accent text-bold  "
                      : " hover:bg-hover ") + " my-1  w-full py-2 rounded-lg"
                  }
                >
                  <div className="flex items-center">
                    <div className="mx-2 ">{opt.icon}</div>
                    {opt.name}
                  </div>
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

const HeaderContent = () => {
  const useAuth = useContext(AuthContext);

  const uiContext = useContext(UIContext);
  const authContext = useContext(AuthContext);

  const PofileButton = () => {
    return (
      <button
        onClick={authContext.handleLogout}
        className=" font-bold   relative z-0"
      >
        <div className="flex items-center justify-center z-10 opacity-0 rounded-xl  hover:bg-primary hover:opacity-100 w-full h-full absolute inset-0  duration-100  ">
          <p>Sign out</p>
        </div>
        <div className="flex items-center  w-full h-full relative hover:opacity-0 z-0">
          {useAuth.currentUser.name}
          <img
            src={useAuth.currentUser.picture}
            alt={""}
            width={50}
            height={50}
            className={"rounded-full ml-3"}
          />
        </div>
      </button>
    );
  };

  return (
    <div className="  flex flex-grow items-center justify-between px-3 mt-2  ">
      <button
        className="block md:hidden hover:bg-hover p-2 rounded-full"
        onClick={() => {
          uiContext.showMenuDrawer(true);
        }}
      >
        <img src={MenuIcon} width={30} alt={""} />
      </button>
      <div className="hidden md:block ">
        {/* title and logo*/}
        <div className="flex items-center  text-headline">
          <img src={MailIcon} width={30} alt={""} />

          <h1 className="text-white font-bold text-2xl pl-5">Nmail</h1>
        </div>
      </div>
      {/*Perfil */}
      <PofileButton />
    </div>
  );
};
