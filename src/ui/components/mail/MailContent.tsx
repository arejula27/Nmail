import React, { FC, MouseEventHandler, useContext } from "react";

import { Divider } from "../ui";
import ReplyIcon from "../../../assets/arrow-reply.svg";
import ForwardIcon from "../../../assets/arrow-forward.svg";
import LeftIcon from "../../../assets/arrow-left.svg";

import { MailData } from "../../../core/mail/domain/models";
import { MailContext } from "../../hooks/mail/MailContext";

interface Props {
  mail: MailData | undefined;
}

export const MailContent: FC<Props> = ({ mail }) => {
  const mailContext = useContext(MailContext);

  return mail === undefined ? (
    <h1>no mail selected</h1>
  ) : (
    <div className=" px-4 pr-10 xl:ml-10 w-full xl:w-1/2  overflow-scroll h-[80vh] ">
      <div className="flex items-start mb-4 ">
        <button
          className=" xl:collapse hover:bg-hover p-1 rounded-full"
          onClick={() => {
            mailContext.unselectMail();
          }}
        >
          <img src={LeftIcon} width={30} alt="Back icon" />
        </button>
        <h1 className="text-3xl font-bold mx-3 ">{mail.title}</h1>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            className="rounded-full h-12 mx-3"
            src={mail.sender.imageUrl}
          ></img>

          {mail.sender.name}
        </div>
        <div>
          <h2>{mail.date}</h2>
          <div className="mt-2 flex items-center">
            <button className="stroke-1 hover:bg-hover p-1 rounded-full mx-1">
              <img src={ReplyIcon} width={20} alt="Reply icon" />
            </button>
            <button className="stroke-1 hover:bg-hover p-1 rounded-full mx-1 ">
              <img src={ForwardIcon} width={20} alt="Fordward icon" />
            </button>
          </div>
        </div>
      </div>
      <Divider />
      <p>{mail.content}</p>
    </div>
  );
};
