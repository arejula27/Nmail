import React, { FC, useContext } from "react";
import { MailCard } from ".";

import { MailData } from "../../../core/mail/domain/mail";
import { MailContext } from "../../hooks/mail/MailContext";

interface Props {
  mailsList: MailData[];
}
export const MailList: FC<Props> = ({ mailsList }) => {
  const mailContext = useContext(MailContext);
  return (
    <div className="w-full xl:w-1/2 h-[80vh] ">
      <div className="m-3  h-full overflow-scroll">
        {mailsList.map((mail, idx) => (
          <MailCard
            mail={mail}
            key={idx}
            selected={mailContext.selectedMail?.id === mail.id}
          />
        ))}
      </div>
    </div>
  );
};
