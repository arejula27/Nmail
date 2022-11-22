import React, { FC } from "react";
import { MailCard } from ".";
import { MailData } from "../../interfaces";

interface Props {
  mailsList: MailData[];
  selectedMail: string;
}
export const MailList: FC<Props> = ({ mailsList, selectedMail }) => {
  return (
    <div className="w-full xl:w-1/2 h-[80vh] ">
      <div className="m-3  h-full overflow-scroll">
        {mailsList.map((mail, idx) => (
          <MailCard mail={mail} key={idx} selected={selectedMail === mail.id} />
        ))}
      </div>
    </div>
  );
};
