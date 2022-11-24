import React, { useContext, useState } from "react";
import CrossIcon from "../../public/cross.svg";
import MinusIcon from "../../public/minus.svg";
import ExpandIcon from "../../public/expand.svg";
import { Divider } from "../ui";
import { UIContext } from "../../context/UI";

interface FormValues {
  subject: string;
  recipients: string;
  content: string;
}

export const NewMessageModal = () => {
  const [formValues, setFormValues] = useState({
    subject: "",
    recipients: "",
    content: "",
  });
  const uiContext = useContext(UIContext);
  const [minimized, setMinimized] = useState(false);

  const closeModal = () => {
    uiContext.showNewMessageModal(false);
  };

  const MinimizedModal = () => {
    return (
      <div>
        <div className="flex justify-between  items-center bg-primary w-80  h-10 rounded-lg  py-2 mb-4 absolute bottom-0 right-0 z-2 mx-3">
          <h3 className="text-headline m-2">New message</h3>
          <div>
            <button
              className="p-2  hover:bg-hover rounded-full mx-1"
              onClick={() => {
                setMinimized(false);
              }}
            >
              <ExpandIcon height={20} />
            </button>
            <button
              className="p-2  hover:bg-hover rounded-full mx-1"
              onClick={closeModal}
            >
              <CrossIcon height={20} />
            </button>
          </div>
        </div>
      </div>
    );
  };
  const FullModal = () => {
    return (
      <div className="absolute h-2/3 w-2/3 xl:w-1/2 xl:h-4/5 border-stroke border-1 shadow-2xl  bg-background rounded-lg z-2 mx-3 bottom-0 right-0 my-2 ">
        {/*header bar */}
        <div className="flex justify-between  items-center bg-primary w-full h-10 rounded-t-lg  py-2 mb-4">
          <h3 className="text-headline m-2">New message</h3>
          <div>
            <button
              className="p-2  hover:bg-hover rounded-full mx-1"
              onClick={() => {
                setMinimized(true);
              }}
            >
              <MinusIcon height={20} />
            </button>
            <button
              className="p-2  hover:bg-hover rounded-full mx-1"
              onClick={closeModal}
            >
              <CrossIcon height={20} />
            </button>
          </div>
        </div>
        <div className="mx-3 h-3/4 mb-4">
          <form className=" h-full">
            <input
              placeholder="Recipients"
              className="flex-grow  outline-none"
              value={formValues.recipients}
              onChange={(e) => {
                setFormValues({ ...formValues, recipients: e.target.value });
              }}
            />
            <Divider />

            <input
              placeholder="Subject"
              className="flex-grow  outline-none "
              value={formValues.subject}
              onChange={(e) => {
                setFormValues({ ...formValues, subject: e.target.value });
              }}
            />
            <Divider />
            <textarea
              value={formValues.content}
              draggable={false}
              className=" h-5/6 outline-none w-full resize-none "
              onChange={(e) => {
                setFormValues({ ...formValues, content: e.target.value });
              }}
            />
          </form>
        </div>
        <div className="flex flex-grow justify-end">
          <button
            className="bg-primary rounded-lg py-3 px-5 m-5 hover:bg-hover"
            onClick={() => {}}
          >
            Send message
          </button>
        </div>
      </div>
    );
  };

  return minimized ? <MinimizedModal /> : <FullModal />;
};