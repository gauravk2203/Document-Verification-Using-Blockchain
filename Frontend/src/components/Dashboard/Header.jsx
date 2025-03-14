import React from "react";

export const Header = ({ title, subTitle, pid, abcID }) => {
  return (
    <div className="w-full h-[75px]">
      <div className="flex justify-between w-fit px-1">
        <h1 className="text-3xl font-medium">{title}</h1>
        <h1 className="text-3xl font-medium">({abcID ? abcID : pid})</h1>
      </div>
      <p className="text-base px-1">{subTitle}</p>
    </div>
  );
};
