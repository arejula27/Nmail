import React from "react";
import CrossIcon from "../../public/cross.svg";
import MinusIcon from "../../public/minus.svg";
import { Divider } from "../ui";

export const NewMessageModal = () => {
  return (
    <div className="absolute h-2/3 w-2/3 xl:w-1/2 xl:h-4/5 border-stroke border-1 shadow-2xl sha bg-background rounded-lg z-2 mx-3 bottom-0 right-0 my-2 ">
      {/*header bar */}
      <div className="flex justify-between  items-center bg-primary w-full h-10 rounded-t-lg  py-2 mb-4">
        <h3 className="text-headline m-2">New message</h3>
        <div>
          <button className="p-2  hover:bg-hover rounded-full mx-1">
            <MinusIcon height={20} />
          </button>
          <button className="p-2  hover:bg-hover rounded-full mx-1">
            <CrossIcon height={20} />
          </button>
        </div>
      </div>
      <form className="mx-3 h-4/6 mb-4 ">
        <input
          name="recipients"
          placeholder="Recipients"
          className="flex-grow  outline-none"
        />
        <Divider />

        <input
          name="subject"
          placeholder="Subject"
          className="flex-grow  outline-none "
        />
        <Divider />
        <textarea
          style={{}}
          draggable={false}
          className=" h-full outline-none w-full resize-none s"
        />
      </form>
    </div>
  );
};
