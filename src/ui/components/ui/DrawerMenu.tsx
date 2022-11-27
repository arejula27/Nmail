import React, { FC, useContext } from "react";
import { PropsWithChildren } from "react";

import CrossIcon from "../../../assets/cross.svg";
import { UIContext } from "../../../context/UI/service/UIContext";

export const DrawerMenu: FC<PropsWithChildren> = ({ children }) => {
  const uiContext = useContext(UIContext);
  return (
    <div className="w-screen h-screen bg-background p-3">
      <button
        className="hover:bg-hover p-2 rounded-full my-1"
        onClick={() => {
          uiContext.showMenuDrawer(false);
        }}
      >
        <img src={CrossIcon} alt="Cross icon" width={30} />
      </button>
      {children}
    </div>
  );
};
