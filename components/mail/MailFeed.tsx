import React, { FC } from "react";
import { MailData } from "../../interfaces";
import { MailCard } from "./MailCard";

interface Props {
  mailsList: MailData[];
  selectedMail: MailData;
}

export const MailFeed: FC<Props> = ({ mailsList, selectedMail }) => {
  return (
    <div className=" px-3">
      <div className="flex text-stroke">{}</div>

      <div className="flex ">
        {/**List of mails */}
        <div className=" w-1/2 h-[80vh] ">
          <div className="m-3  h-full overflow-scroll">
            {mailsList.map((mail, idx) => (
              <MailCard
                mail={mail}
                key={idx}
                selected={selectedMail.id === mail.id}
              />
            ))}
          </div>
        </div>
        {/**Mail content */}
        <div className="m-4 w-1/2 overflow-scroll h-[80vh] ">
          <h1 className="text-3xl font-bold mb-4 ">{selectedMail.title}</h1>
          <p>{selectedMail.content}</p>
        </div>
      </div>
    </div>
  );
};
