import axios from 'axios';
import './ViewProfileTeacher.css'
import Cookies from 'universal-cookie';
import React, { useState } from 'react'
import { useParams } from "react-router";
import swal from '@sweetalert/with-react';
import foto from '../ImgProfile/group.webp'
import Modal from "@material-ui/core/Modal";
import { ViewProfileStudent } from './ViewProfileStudent';

export const ViewProfileTeacher = ({ courseStudent }) => {

  const { name } = useParams()
  const [errorMessage, setErrorMessage] = useState(false);

  const cookies = new Cookies();
  const documentTeacher = (cookies.get("idDocente"))

  const UrlHistory = "https://oversigthapi.azurewebsites.net/v1/students/" + name + "/observers"

  const [title, setTitle] = useState("")
  const [data, setData] = useState("")
  const [descripTeacher, setDescripTeacher] = useState("")
  const [descripStudent, setDescripStudent] = useState("")
  const [signaTeacher, setSignaTeacher] = useState("")
  const [signaStudent, setSignaStudent] = useState("")


  const getHistory = () => {
    axios.post(UrlHistory, {
      documentTeacher: documentTeacher,
      title: title,
      date: data,
      descriptionTeacher: descripTeacher,
      descriptionStudent: descripStudent,
      signatureStudent: signaStudent,
      signatureTeacher: signaTeacher
    })
      .then((response) => token(response.data))
      .catch((error) => console.log(error))
  }

  const token = (data) => {
    axios.get(`https://oversigthapi.azurewebsites.net/v1/decode/${data}`)
      .then((res) => userHistory(res.data))
  }

  const userHistory = (data) => {
    const { message } = data;
    message ? showMessageHistoryError() : validateHistory();
  }

  const validateHistory = () => {
    setErrorMessage(true)
    swal("Oops!", "No se pudo agregar la anotacion", "error");
  }

  const showMessageHistoryError = () => {
    swal("Exito!", "Se registro la anotacion exitosamente", "success")
  }

  const [openGroup, setOpenGroup] = React.useState(false);

  const handleOpenGroup = () => {
    setOpenGroup(true);
  };
  const handleCloseGroup = () => {
    setOpenGroup(false);
  };

  const viewProfileStudent = (
    <div className="paper1">
      <ViewProfileStudent courseStudent={courseStudent} />
      <div className="btn_Cancel">
        <p className="cancel1" onClick={handleCloseGroup}>X</p>
      </div>
    </div>
  )

  return (
    <div>
      <img src={courseStudent.fotoEstudiante || foto} alt="photo" className="photoViewTeacher" onClick={handleOpenGroup} />
      <div className="informationTeacher">
        <p> {courseStudent.estudianteNombre} {courseStudent.estudianteApellido}</p>
        <p> {courseStudent.estudianteDocumento} </p>
        <p> Estudiante </p>
      </div>
      <div className='containerTeacher'>
        <div>
          <input
            type="text"
            name="titleTeacher"
            placeholder='Titulo'
            className='titleTeacher'
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='dataContTe'>
          <input
            placeholder="Fecha nacimiento"
            className="dataTe"
            type="date"
            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
            onChange={(e) => setData(e.target.value)}
          />
        </div>
        <div className='description'>
          <p>Descripcion Docente</p>
          <textarea
            className='descrip'
            name="docente"
            cols="30"
            rows="10"
            placeholder='Ingrese la descripcion del docente'
            onChange={(e) => setDescripTeacher(e.target.value)}
          ></textarea>
          <div className="descriptionStuden">
            <p>Descripcion Estudiante</p>
            <textarea
              className='descrip'
              name="docente"
              cols="30"
              rows="10"
              placeholder='Ingrese la descripcion del estudiante'
              onChange={(e) => setDescripStudent(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className='firms'>
          <input
            type="text"
            name="title"
            placeholder='Firma Docente'
            className='firm'
            onChange={(e) => setSignaTeacher(e.target.value)}
          />
          <input
            type="text"
            name="title"
            placeholder='Firma Estudiante'
            className='firm'
            onChange={(e) => setSignaStudent(e.target.value)}
          />
        </div>
      </div>
      <button className='btnRegister' onClick={() => getHistory()}>Registrar</button>
      <Modal open={openGroup} onClose={handleCloseGroup}>
        {viewProfileStudent}
      </Modal>
    </div>
  )
}