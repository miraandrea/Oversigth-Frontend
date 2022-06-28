import "./Main.css";
import { Card } from "../../IU/Card/Card";
import { NavLink } from 'react-router-dom';
import React from "react";

export const Main = ({ course }) => {

  return (
    <div>
      <NavLink to={`/Usuario_Administrador/${course.nombre}`} style={{ textDecoration: 'none' }}>
        <Card course={course} />
      </NavLink>
    </div>
  );
};
