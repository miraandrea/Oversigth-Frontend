import "./Login.css";
import axios from "axios";
import swal from "sweetalert";
import React, { useState } from "react";
import logo from "../../../Img/Logo.jpg";
import Cookies from "universal-cookie/es6";
import { TiLockClosed } from "react-icons/ti";
import { IoPersonAddOutline } from "react-icons/io5";
import { TextField, Button, Typography } from "@mui/material";

export const Login = () => {
  const urlUserAuthenticate = "https://oversigthapi.azurewebsites.net/v5/authenticate";

  const cookies = new Cookies();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messageHelperText, setMessageHelperText] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);

  // Handle to manage username status
  const handleUser = (e) => setUsername(e.target.value);

  // Handle to manage password status
  const handlePassword = (e) => setPassword(e.target.value);

  // Handler button to validate if the user entered correct data
  const handleSubmit = () => {
    axios
      .post(urlUserAuthenticate, {
        username: username,
        password: password,
      })
      .then((response) => {
        window.localStorage.setItem(
          "authentication",
          response.data.authentication
        );
        return validateSignIn(response);
      })
      .catch((error) => console.log(error));
  };

  // Validates if the user could be authenticated or not.
  const validateSignIn = (data) => {
    const { authentication } = data.data;
    authentication ? validateRolUser(data) : showMessageAuthenticationError();
  };

  // Validates the user role to send it to different urls depending on this role
  const validateRolUser = (data) => {
    window.localStorage.setItem("rol",data.data.rol);
    const { rol } = data.data;
    if (rol == "Student") {
      return saveCredentialsOfStudent(data);
    } else if (rol == "Administrator") {
      return saveCredentialsOfAdministrator(data);
    } else if (rol == "Teacher") {
      return saveCredentialsOfTeacher(data);
    }
  };

  // Stores administrator credentials within cookies
  const saveCredentialsOfAdministrator = (data) => {
    const respuesta = data.data.data[0];
    cookies.set("idAdministrador", respuesta.documento, { path: "/" });
    return (window.location.href = "/Administrador");
  };
  
  // Stores teacher credentials within cookies
  const saveCredentialsOfTeacher = (data) => {
    const respuesta = data.data.data[0];
    cookies.set("idDocente", respuesta.documento, { path: "/" });
    return (window.location.href = "/Docente");
  };

  // Stores student credentials within cookies
  const saveCredentialsOfStudent = (data) => {
    const respuesta = data.data.data[0];
    cookies.set("idEstudiante", respuesta.documento, { path: "/" });
    return (window.location.href = "/Estudiante");
  };

  const showMessageAuthenticationError = () => {
    setErrorMessage(true);
    setMessageHelperText("Usuario o contraseña incorrecta");
  };

  //btn bloquiado
  function nobackbutton() {
    window.location.hash = "no-back-button";
    window.location.hash = "Again-No-back-button";

    window.onhashchange = function () {
      window.location.hash = "no-back-button";
    };
  }

  return (
    <div className="login">
      {nobackbutton()}
      <div className="container">
        <div className="login_title">Oversight</div>
        <form className="login_form">
          <div className="form_container">
            <div className="form_input">
              <IoPersonAddOutline className="form_icon" />
              <TextField
                id="txtEmail"
                label="Usuario"
                variant="outlined"
                name="username"
                error={errorMessage}
                autoFocus
                onChange={handleUser}
              />
            </div>
            <div className="form_input">
              <TiLockClosed className="form_icon" />
              <TextField
                id="txtEmail"
                label="Contraseña"
                variant="outlined"
                name="password"
                type="password"
                error={errorMessage}
                helperText={messageHelperText}
                onChange={handlePassword}
                />
            </div>
            <div onClick={handleSubmit} className="form_btn">
              <Button variant="contained">Iniciar Sesion</Button>
            </div>
          </div>
        </form>
        <div className="login_options">
          <div className="options_forgetPassword">
            <hr className="login_line" />
            <h4>O</h4>
            <hr className="login_line" />
          </div>
        </div>
        <div className="login_forgetPassword">
          <h3 onClick={() => MostrarAlerta()}>¿Olvidaste tu Contraseña?</h3>
        </div>
        <div className="login_credentials">
          <hr className="credentials_line" />
          <div className="credentials_text">
            <Typography variant="body2" color="text.secondary" align="center">
              {"Copyright © Oversight "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          </div>
        </div>
      </div>
      <div className="login_image">
        <img className="login_logo" src={logo} alt="sls"></img>
      </div>
    </div>
  );
};

const MostrarAlerta = () => {
  swal({
    buttons: {
      confirm: { text: "Entendido", className: "swal-button1" },
    },
    title: "Querido Usuario",
    text: "Tu usuario y contraseña es el documento de identidad",
  });
};