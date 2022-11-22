import React, { FC, useContext, useEffect, useState } from "react";
import { MailContent, MailList } from ".";
import { MailContext } from "../../context/mail";
import { feedKind, MailData } from "../../interfaces";
import { Divider } from "../ui";

export interface action {
  title: string;
  kind: feedKind;
}

interface Props {
  mailsList: MailData[];
  actions: action[];
}

export const MailFeed: FC<Props> = ({ mailsList, actions = [] }) => {
  const xl = 1280;

  //todo: provoca un efecto raro al iniciarse en un valor arbitrario
  //pasarlo a un context
  const [windowDimenion, detectHW] = useState({
    winWidth: 10000,
    winHeight: 100000,
  });
  const mailContext = useContext(MailContext);

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
    window.addEventListener("resize", detectSize);
    if (!mounted) {
      setMounted(true);
      detectSize();
    }

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [mounted, windowDimenion, mailContext.selectedMail]);

  const SmallFeed = () => {
    console.log(mailContext.selectedMail);

    console.log(mailContext.selectMail === undefined);

    return mailContext.selectedMail === undefined ? (
      <div>
        <ActionsMenu />
        <MailList mailsList={mailsList} />
      </div>
    ) : (
      <MailContent mail={mailContext.selectedMail} />
    );
  };

  const ActionsMenu = () => {
    console.log(actions.length);

    return actions.length > 0 ? (
      <div>
        <div className="flex text-stroke px-3">
          {/*content header menu */}
          {actions.map((opt, idx) => (
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
      </div>
    ) : null;
  };

  return mounted ? (
    windowDimenion.winWidth > xl ? (
      <div>
        <ActionsMenu />
        <div className=" px-3">
          <div className="flex text-stroke">{}</div>

          <div className="flex ">
            {/**List of mails */}
            <MailList mailsList={mailsList} />
            {/**Mail content */}
            <MailContent mail={mailContext.selectedMail} />
          </div>
        </div>
      </div>
    ) : (
      SmallFeed()
    )
  ) : null;
};
