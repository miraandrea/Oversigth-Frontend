import React from "react";
import { TiLockClosed } from "react-icons/ti";
import { IoPersonAddOutline } from "react-icons/io5";
import "./Iconos.css";

export const Iconos = () => {
  
  return (
    <div>
      <div className="icons">
        <IoPersonAddOutline className="username" />
        <TiLockClosed className="padlock" />
      </div>
      <div className="candado1"></div>
    </div>
  );
};