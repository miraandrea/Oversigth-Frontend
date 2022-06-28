import "./Register.css";
import axios from "axios";
import swal from '@sweetalert/with-react';
import { IoMdPersonAdd } from "react-icons/io";
import React, { useEffect, useState } from "react";

export const Register = () => {

  //token course
  const UrlTokenCourse = "https://oversigthapi.azurewebsites.net/v3/courses";

  useEffect(() => {
    const getCourses = () => {
      axios.get(UrlTokenCourse)
        .then((res) => user(res.data))
        .catch((error) => console.log(error))
    };
    getCourses();
  }, []);

  // Rol courses
  const [data, setData] = useState([" "]);

  const user = (data) => {
    const urlCourse = "https://oversigthapi.azurewebsites.net/v1/decode/" + data;
    axios.get(urlCourse).then((response) => {
      setData(response.data[0]);
    });
  }

  // Rol usuarios
  const [rolUsers, setRolUsers] = useState("");
  let URL;

  //mensages
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  //Registar
  const [document, setDocument] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateBirth, setDateBirth] = useState("");
  const [sex, setSex] = useState("");
  const [course, setCourse] = useState("");
  const [image, setImage] = useState(null)

  let formdata = new FormData()

  const format = (e) => {
    if (rolUsers == 2) {
      URL = "https://oversigthapi.azurewebsites.net/v4/students";
    }
    if (rolUsers == 3) {
      URL = "https://oversigthapi.azurewebsites.net/v4/teachers";
    }
    if (rolUsers == "") {
      const paragrapg = "Es necesario escoger el rol";
      setMessage(paragrapg);
    }

    e.preventDefault();
    formdata.append("document", document)
    formdata.append("name", name)
    formdata.append("lastName", lastName)
    formdata.append("dateOfBirth", dateBirth)
    formdata.append("genre", sex)
    formdata.append("idcourse", course)
    formdata.append("image", image)
    formdata.append("signature", null)

    axios
      .post(URL, formdata)
      .then((response) => userRegister(response.data))
      .catch((error) => console.log(error));
  };

  const userRegister = (data) => {
    const { registered } = data;
    registered ? showMessageRegisterError() : validateRegister();
  }
  const validateRegister = () => {
    setErrorMessage(true)
    swal("Oops!", "No se pudo registar", "error");
  }
  const showMessageRegisterError = () => {
    swal("Exito!", "Se registro exitosamente", "success")
  }

  return (
    <div>
      <form onSubmit={format}>
        <p className="Register">Registrar</p>
        <IoMdPersonAdd className="iconregister" />
        <div className="mainRegister">
          <hr className="lineRegister" />
          <div className="containerRegister">
            <div className="last">
              <input
                onChange={(e) => setName(e.target.value)}
                className="name"
                type="text"
                placeholder="Nombres"
                required
              />
              <input
                onChange={(e) => setLastName(e.target.value)}
                className="lastName"
                type="text"
                placeholder="Apellidos"
                required
              />
            </div>
            <div className="containerDocement">
              <input
                onChange={(e) => setDocument(e.target.value)}
                className="docement"
                type="number"
                placeholder="Documento Identidad"
                required
              />
            </div>
            <div className="containerData">
              <input
                placeholder="Fecha nacimiento"
                className="date"
                type="date"
                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                onChange={(e) => setDateBirth(e.target.value)}
              />
            </div>
            <div className="photoRegister">
              <input type="file" className="inputfile" onChange={e => setImage(e.target.files[0])} />
            </div>
            <div className="containerSelect">
              <select className="select" onChange={(e) => setSex(e.target.value)}>
                <option value="null">Genero</option>
                <option value="F">Feminino</option>
                <option value="M">Masculino</option>
              </select>
              <select
                className="select"
                onChange={(e) => setRolUsers(e.target.value)}
              >
                <option value="1">Seleccione un rol</option>
                <option value="2">Estudiante</option>
                <option value="3">Docente</option>
              </select>
              <p className="message">{message}</p>
              <select
                className="select"
                onChange={(e) => setCourse(e.target.value)}
              >
                <option>Seleccione un curso</option>
                {data.map((el, index) => {
                  return (
                    <option key={index} value={el.idcurso}>
                      {el.nombre}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="btn_Registrar">
          <button type="submit" className="Registrar">
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};