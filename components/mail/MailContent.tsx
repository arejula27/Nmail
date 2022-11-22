import React, { FC, MouseEventHandler, useContext } from "react";
import { MailData } from "../../interfaces";
import { Divider } from "../ui";

import ReplyIcon from "../../public/arrow-reply.svg";
import ForwardIcon from "../../public/arrow-forward.svg";
import LeftIcon from "../../public/arrow-left.svg";
import { MailContext } from "../../context/mail";

interface Props {
  mail: MailData | undefined;
}

export const MailContent: FC<Props> = ({ mail }) => {
  const mailContext = useContext(MailContext);

  return mail === undefined ? (
    <h1>no mail selected</h1>
  ) : (
    <div className=" px-4 pr-10 xl:ml-10 w-full xl:w-1/2  overflow-scroll h-[80vh] ">
      <div className="flex items-center mb-4 ">
        <button
          className="stroke-2 xl:collapse hover:bg-hover p-1 rounded-full"
          onClick={() => {
            mailContext.unselectMail();
          }}
        >
          <LeftIcon height={25} />
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
              <ReplyIcon height={25} />
            </button>
            <button className="stroke-1 hover:bg-hover p-1 rounded-full mx-1 ">
              <ForwardIcon height={28} />
            </button>
          </div>
        </div>
      </div>
      <Divider />
      <p>{mail.content}</p>
    </div>
  );
};
