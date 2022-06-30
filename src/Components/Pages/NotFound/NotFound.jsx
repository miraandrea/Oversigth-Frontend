import React from 'react'
import './NotFound.css'
import { IoMdHome } from "react-icons/io";
import { NavLink } from "react-router-dom";
import Photo404 from "../../../Img/404.webp"

export const NotFound = () => {

  const rol = window.localStorage.getItem("rol")
  let routes = ""

  if (rol == "Administrator") {
    routes = "/Administrador"
  }
  else if (rol == "Teacher") {
    routes = "/Docente"
  }
  else if (rol == "Student") {
    routes = "/Estudiante"
  }

  return (
    <div>
        <div className="conteiner">
            <div className="container1">
                <img className='phtoto404' src={Photo404} alt={Photo404} />
                <h1>404</h1>
                <h3>La pagina no funciona</h3>
                <p>Lo sentimos, la página en la que solicita no se encuentra, vuelva a la página de inicio.</p>
                <button>
                    <NavLink to={routes}>
                        <IoMdHome className="iconmenu" />
                    </NavLink>
                </button>
            </div>
        </div>
    </div>
  )
}