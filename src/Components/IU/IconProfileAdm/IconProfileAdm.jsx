import React, { useState } from "react";
import { IoExitOutline } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import Cookies from "universal-cookie/es6";
import { NavLink } from "react-router-dom";
import '../../Layout/AdmProfileFooter/AdmProfileFooter.css'

export const IconProfileAdm = () => {

  const cookies = new Cookies();

  const cerrarSesion = () => {
    cookies.remove("documento", { path: "/" });
    cookies.remove("foto", { path: "/" });
    cookies.remove("nombre", { path: "/" });
    cookies.remove("apellido", { path: "/" });
    cookies.remove("fecha", { path: "/" });
    localStorage.clear()
    window.location.href = "/";
  };


  let rol = localStorage.getItem("rol")

  const cerra = () => {

    if (rol === "Teacher"){
      window.location.href = "/Docente";
    } 
    if (rol === "Administrator"){
      window.location.href = "/Administrador";
    }
    if (rol === "Student"){
      window.location.href = "/Estudiante";
    }
  }
  return (
    <div className="hr" >
      <p className="aviso">Salir</p>
      <IoExitOutline onClick={() => cerrarSesion()} className="admi" />
      <p className="aviso">Inicio </p>
      <IoMdHome onClick={() => cerra()} className="admi" />
    </div>
  );
};