import React, { FC } from "react";
import { MailData } from "../../models";

interface Props {
  mail: MailData;
  selected: boolean;
}

export const MailCard: FC<Props> = ({ mail, selected }) => {
  const imageUrl = "https://i.postimg.cc/QCWJKsmW/Dreadful-Rate226.png";
  const usrName = "Sapo";
  const mailTitle = "Hola buenos días quieres ser tu ptopio jefe?";

  return (
    <button
      className={
        (selected ? "bg-accent " : " bg-background") +
        "text-headline flex   p-4 m-3 rounded-xl   hover:bg-hover"
      }
    >
      <img
        src={mail.sender.imageUrl}
        alt={""}
        className={"rounded-full mx-3 w-16 h-16"}
      />
      <div className="   h-12 w-fit overflow-y-hidden">
        <h2 className="font-bold font-paragraph text-ellipsis">
          {mail.sender.name}
        </h2>
        <h2 className="">{mail.title}</h2>
      </div>
    </button>
  );
};
