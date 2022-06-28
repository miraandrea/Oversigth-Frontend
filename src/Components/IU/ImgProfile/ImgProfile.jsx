import "./ImgProfile.css";
import React from "react";
import Logo from "./ejemplo.jpg";
import { NavLink } from "react-router-dom";

export const ImgProfile = () => {
  return (
    <div>
        <img src={Logo} alt="Perfile"/>
    </div>
  );
};
