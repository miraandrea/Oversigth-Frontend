
import { CardTeacher } from "../../IU/CardTeacher/CardTeacher";
import axios from "axios";
import jwtDecode from "jwt-decode";

import { NavLink } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie/es6";

export const MainTeacher = ({ course1 }) => {

  // const [courses, setCourses] = useState([]);

  // const cookies = new Cookies()
  // const idUser = cookies.get("idDocente")

  // const UrlTokenCourse = `http://localhost:4000/v1/teachers/${idUser}/courses`;

  // console.log(UrlTokenCourse);

  // useEffect(() => {
  //   const getCourses = () => {
  //     axios.get(UrlTokenCourse)
  //       .then((res) => {
  //         const token = jwtDecode(res.data)
  //         console.log(token.results[0])
  //       })
  //       .catch((error) => console.log(error))

  //   };
  //   getCourses();
  // }, []);


  return (
    <div>
      <NavLink to={`/Usuario_Docente/${course1.curso}`} style={{ textDecoration: 'none' }}>
        <CardTeacher course1={course1} />
      </NavLink>
    </div>
  );
};
