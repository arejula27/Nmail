import React, { FC } from "react";
import { MailData } from "../../interfaces";

interface Props {
  selectedMail: MailData;
}

export const MailContent: FC<Props> = ({ selectedMail }) => {
  return (
    <div className=" px-4 xl:m-4 w-full xl:w-1/2  overflow-scroll h-[80vh] ">
      <h1 className="text-3xl font-bold mb-4 ">{selectedMail.title}</h1>
      <p>{selectedMail.content}</p>
    </div>
  );
};
