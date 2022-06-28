import React from "react";
import { NavLink } from "react-router-dom";
import { CardTeachUsers } from "../../IU/CardTeachUsers/CardTeachUsers";

export const MainTeacherUser = ({ courseStudent }) => {

  return (
    <div>
      <NavLink to={`/Usuario_Docente/${courseStudent.estudianteDocumento}`} style={{ textDecoration: 'none' }}>
        <CardTeachUsers courseStudent={courseStudent} />
      </NavLink>
    </div>
  );
};