import React, { FC, useContext, useEffect, useState } from "react";
import { MailContent, MailList } from ".";
import { MailContext } from "../../context/mail";
import { MailData } from "../../interfaces";

interface Props {
  mailsList: MailData[];
}

export const MailFeed: FC<Props> = ({ mailsList }) => {
  const xl = 1280;

  const [windowDimenion, detectHW] = useState({
    winWidth: 0,
    winHeight: 0,
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
      <MailList mailsList={mailsList} />
    ) : (
      <MailContent mail={mailContext.selectedMail} />
    );
  };

  return windowDimenion.winWidth > xl ? (
    <div className=" px-3">
      <div className="flex text-stroke">{}</div>

      <div className="flex ">
        {/**List of mails */}
        <MailList mailsList={mailsList} />
        {/**Mail content */}
        <MailContent mail={mailContext.selectedMail} />
      </div>
    </div>
  ) : (
    SmallFeed()
  );
};
