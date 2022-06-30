import axios from "axios";
import './ViewProfileAdmi.css'
import { useParams } from "react-router";
import swal from '@sweetalert/with-react';
import React, { useEffect, useState } from 'react'

//components
import foto from '../ImgProfile/student.jpg'
import { CardStudent } from '../CardStudent/CardStudent';

//librerias
import jwtDecode from "jwt-decode";
import { AiOutlineFileSearch } from "react-icons/ai";
import Cookies from "universal-cookie";

export const ViewProfileAdmiTeacher = ({ teacher }) => {

  //editar
  const cookies = new Cookies();
  const documentAdmin = (cookies.get("idAdministrador"))
  
  const [nameTeacher, setNameTeacher] = useState("")
  const [lastName, setLastName] = useState("")

  const UrlStudent1 = "http://localhost:4000/v1/administrators/" + documentAdmin + "/teachers/" + teacher.documentoDocente;

  const format = () => {

    axios.put(UrlStudent1, {
      "name": nameTeacher,
      "lastName": lastName
    })
      .then((response) => getMessage(response.status))
      .catch((error) => console.log(error))
  }

  const getMessage = (data) => {
    if (data == 202) {
      {
        swal("Exito!", "Se actualizo exitosamente", "success")
        // window.location.reload()
      }
    } else {
      swal("Oops!", "No se pudo actualizar", "error");
    }
  }

  //historial 
  const { name } = useParams()
  const [record, setRecord] = useState([]);

  useEffect(() => {
    const getRecord = () => {
      axios.get(`http://localhost:4000/v1/teachers/${name}/observers`)
        .then((res) => {
          const token = jwtDecode(res.data)
          setRecord(token.results)
        })
        .catch((error) => console.log(error))
    };
    getRecord();
  }, []);

  //disable teachers
  const Disable = () => {
    const urlDisable = "http://localhost:4000/v1/teachers/" + teacher.documentoDocente;
    axios.delete(urlDisable).then((response) => {
      mensage(response.status);
    });
  }

  const mensage = (data) => {
    if (data == 202) {
      swal("Exito!", "Se deshabilito exitosamente", "success")
    }
    else {
      swal("Oops!", "No se pudo deshabilitar", "error");
    }
  }

  return (
    <div>
      <img src={teacher.fotoDocente || foto} alt="photo" className="photoView" />
      <div className='centerInfor'>
        <div className='information'>
          <input type="text" defaultValue={teacher.nombreDocente} onChange={(e) => setNameTeacher(e.target.value)} />
          <input type="text" defaultValue={teacher.apellidoDocente} onChange={(e) => setLastName(e.target.value)} />
          <input type="text" value={teacher.documentoDocente} />
          <p>Docente</p>
        </div>
      </div>
      <div className="iconRecord">
        <AiOutlineFileSearch />
        <p>Historial</p>
      </div>
      <div className='centerOver'>
        <div className='OverFlow'>
          <div className="cards1" >
            <div className="cardInfo1">
              {record.length > 0 ? (
                record.map((course2, index) => (
                  <CardStudent key={index} course2={course2} />
                ))
              ) : (
                <div className='mensaje2' >
                  <p className='mensaje' >No tiene anotaciones</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='prueba'>
        <div className='centerBtn' >
          <div className="btn_Cancel1">
            <button className="update" onClick={format}>Actualizar</button>
            <button className="disable" onClick={Disable}>Deshabilitar</button>
          </div>
        </div>
      </div>
    </div>
  )
};