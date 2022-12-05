import React, { FC, useContext, useEffect, useMemo, useState } from "react";
import { User } from "../../../core/contacts/domain";
import { ContactsUseCasesImpl } from "../../../core/contacts/usecases/ContactsUseCases";
import { MailData } from "../../../core/mail/domain/models";
import { MailContext } from "../../hooks/mail/MailContext";

interface Props {
  mail: MailData;
  selected: boolean;
}

export const MailCard: FC<Props> = ({ mail, selected }) => {
  const mailContext = useContext(MailContext);

  const cardStyle =
    (selected ? "bg-accent " : " hover:bg-hover ") +
    "text-headline flex overflow-hidden   p-4 my-1 rounded-xl    w-full ";

  return (
    <button
      className={cardStyle}
      onClick={() => {
        mailContext.selectMail(mail);
      }}
    >
      <img
        src={mail.author?.picture}
        alt={""}
        className={"rounded-full mx-3 w-16 h-16"}
      />

      <div className="  h-14  overflow-y-hidden  w-full">
        <h2 className="font-bold text-ellipsis flex h-8 justify-start ">
          {mail.author?.name}
        </h2>
        <h2 className="flex justify-start ">{mail.title}</h2>
      </div>
    </button>
  );
};
