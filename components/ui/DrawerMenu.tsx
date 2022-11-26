import React, { FC, useContext } from "react";
import { PropsWithChildren } from "react";
import { UIContext } from "../../context/UI/service";
import CrossIcon from "../../public/cross.svg";

export const DrawerMenu: FC<PropsWithChildren> = ({ children }) => {
  const uiContext = useContext(UIContext);
  return (
    <div className="w-screen h-screen bg-background p-3">
      <button
        className="hover:bg-hover p-2 rounded-full"
        onClick={() => {
          uiContext.showMenuDrawer(false);
        }}
      >
        <CrossIcon height={40} />
      </button>
      {children}
    </div>
  );
};
