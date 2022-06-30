import './Profile.css'
import axios from 'axios';
import React, { useState } from 'react';
import swal from '@sweetalert/with-react';
import Cookies from 'universal-cookie/es6'

export const Profile = ({ user }) => {

  let rol = localStorage.getItem("rol")
  const cookies = new Cookies()

  let UrlStudent = "";

  if (rol === "Administrator") {
    const idUser = cookies.get("idAdministrador")
    UrlStudent = "http://localhost:4000/v1/administrators/" + idUser;
  } else if (rol === "Teacher") {
    const idUser = cookies.get("idDocente")
    UrlStudent = "http://localhost:4000/v1/teachers/" + idUser;
  } else if (rol === "Student") {
    const idUser = cookies.get("idEstudiante")
    UrlStudent = "http://localhost:4000/v1/students/" + idUser;
  }

  const [document, setDocument] = useState("")
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [genre, setGenre] = useState("")
  const [signature, setSignature] = useState("")
  const [idCourse, setIdCourse] = useState(3)
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [image, setImage] = useState(null)

  let formdata = new FormData()

  const format = (e) => {

    formdata.append("newDocument", document)
    formdata.append("name", name)
    formdata.append("lastName", lastName)
    formdata.append("dateOfBirth", dateOfBirth)
    formdata.append("genre", genre)
    formdata.append("signature", signature)
    formdata.append("idcourse", idCourse)
    formdata.append("image", image)
    formdata.append("idasignature", 1)

    console.log(e.preventDefault());
    axios.put(UrlStudent, formdata)
      .then((response) => getToken(response.data))
      .catch((error) => console.log(error))
  }

  const getToken = (data) => {
    const urlToken = "http://localhost:4000/v1/decode/" + data;
    axios.get(urlToken).then((response) => {
      getMessage(response.status);
    });
  }
  const getMessage = (data) => {
    console.log(data);
    if (data == 200) {
      {
        swal("Exito!", "Se actualizo exitosamente", "success")
        window.location.reload()
      }
    } else {
      swal("Oops!", "No se pudo actualizar", "error");
    }
  }

  return (
    <div>
      <div className="containerImgProfile">
        <img src={user.foto} alt={user.nombre} className="imgProfile" />
      </div>
      <form className='cont_profile' onSubmit={format}>
        <input className='input_profile' type="text" value={user.curso} />
        <input className='input_profile' type="number" defaultValue={user.documento} onChange={(e) => setDocument(e.target.value)} />
        <input className='input_profile' type="text" defaultValue={user.nombre} onChange={(e) => setName(e.target.value)} />
        <input className='input_profile' type="text" defaultValue={user.apellido} onChange={(e) => setLastName(e.target.value)} />
        <input className='input_profile' type="text" defaultValue={user.fecnac} onChange={(e) => setDateOfBirth(e.target.value)} />
        <input className='input_profile' type="text" defaultValue={user.genero} onChange={(e) => setGenre(e.target.value)} />
        <input className='input_profile' type="text" defaultValue={user.firma} onChange={(e) => setSignature(e.target.value)} />
        <input className='input_profile1' type="file" onChange={e => setImage(e.target.files[0])} />
        <div className="btnUpPerfile">
          <button type="submit" className='Actualizar' >Actualizar</button>
        </div>
      </form>
    </div>
  )
}