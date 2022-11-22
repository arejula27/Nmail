import React, { FC, useEffect, useState } from "react";
import { MailContent, MailList } from ".";
import { MailData } from "../../interfaces";
import { MailCard } from "./MailCard";

interface Props {
  mailsList: MailData[];
  selectedMail: MailData;
}

export const MailFeed: FC<Props> = ({ mailsList, selectedMail }) => {
  const xl = 1280;
  const [showMailContent, setShowMailContent] = useState(true);
  const [windowDimenion, detectHW] = useState({
    winWidth: 0,
    winHeight: 0,
  });

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
  }, [windowDimenion]);

  const SmallFeed = () => {
    return showMailContent ? (
      <MailContent selectedMail={selectedMail} />
    ) : (
      <MailList mailsList={mailsList} selectedMail={selectedMail.id} />
    );
  };

  return windowDimenion.winWidth > xl ? (
    <div className=" px-3">
      <div className="flex text-stroke">{}</div>

      <div className="flex ">
        {/**List of mails */}
        <MailList mailsList={mailsList} selectedMail={selectedMail.id} />
        {/**Mail content */}
        <MailContent selectedMail={selectedMail} />
      </div>
    </div>
  ) : (
    SmallFeed()
  );
};
