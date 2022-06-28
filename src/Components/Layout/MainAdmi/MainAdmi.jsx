import React from "react";
import "./MainAdmi.css";

//components
import { CardAdmi } from "../../IU/CardAdmi/CardAdmi";
import { NavLink } from "react-router-dom";

export const MainAdmi = ({ course }) => {
  return (
    <div>
      <NavLink
        to={`/Usuario_Administrador/${course.estudianteDocumento}`}
        style={{ textDecoration: "none" }}>
        <CardAdmi courseStudent={course} />
      </NavLink>
    </div>
  );
};