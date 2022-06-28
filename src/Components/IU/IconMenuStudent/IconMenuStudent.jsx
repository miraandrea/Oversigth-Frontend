// import React from 'react'
// import { IoMdHome } from "react-icons/io";
// import { IoExitOutline } from "react-icons/io5";
// import { NavLink } from "react-router-dom";
// import Cookies from 'universal-cookie/es6'
// import "./IconMenuStudent.css";

// export const IconMenuStudent = () => {

//   return (
//     <div className='menuStudent'>
//       <NavLink to="/Estudiante">
//         <IoMdHome className="iconmenu" />
//       </NavLink>
//       <p>Inicio</p>
//       <IoExitOutline onClick={() => cerrarSesion()} className="iconmenu" />
//       <p>Salir</p>
//     </div>
//   )
// }

// const cookies = new Cookies()

// const cerrarSesion = () => {

//   cookies.remove('documento', { path: "/" })
//   cookies.remove('foto', { path: "/" });
//   cookies.remove('nombre', { path: "/" })
//   cookies.remove('apellido', { path: "/" })
//   cookies.remove('fecha', { path: "/" })
//   cookies.remove('genero', { path: "/" })
//   cookies.remove('firma', { path: "/" })
//   window.location.href = "/"
// }



import React from "react";
import { IoMdHome } from "react-icons/io";
import { NavLink } from "react-router-dom";
import Cookies from "universal-cookie/es6";
import { IoExitOutline } from "react-icons/io5";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

export const IconMenuStudent = () => {

  return (
    <div className="menu">
      <ListItemButton >
        <ListItemIcon>
          <NavLink to="/Estudiante">
            <IoMdHome className="iconmenu" />
          </NavLink>
        </ListItemIcon>
        <ListItemText primary="Inicio" />
      </ListItemButton>

      <ListItemButton >
        <ListItemIcon>
          <IoExitOutline onClick={() => signOff()} className="iconmenu" />
        </ListItemIcon>
        <ListItemText primary="Salir" />
      </ListItemButton>
    </div>
  );
};

const cookies = new Cookies();

const signOff = () => {
  cookies.remove("idAdministrador", { path: "/" });
  localStorage.clear()
  window.location.href = "/";
};