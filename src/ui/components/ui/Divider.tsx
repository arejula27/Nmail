import React, { FC } from "react";

interface Props {
  margingX?: number;
}

export const Divider: FC<Props> = ({ margingX = 0 }) => {
  return (
    <div
      className={
        "flex-grow border-t border-stroke border-opacity-10 my-2 mx-" + margingX
      }
    />
  );
};
