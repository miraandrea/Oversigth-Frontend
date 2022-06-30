import axios from "axios";
import jwtDecode from "jwt-decode";
import { useParams } from "react-router";
import foto from '../ImgProfile/student.jpg'
import React, { useEffect, useState } from 'react'
import { AiOutlineFileSearch } from "react-icons/ai";
import { CardStudent } from '../CardStudent/CardStudent';

export const ViewProfileStudent = ({ courseStudent }) => {

    const { name } = useParams()
  const [record, setRecord] = useState([]);

  useEffect(() => {
    const getRecord = () => {
      axios.get(`http://localhost:4000/v2/students/${name}/observers`)
        .then((res) => {
          const token = jwtDecode(res.data)
          setRecord(token.results)
        })
        .catch((error) => console.log(error))
    };
    getRecord();
  }, []);

  return (
    <div>
      <img src={courseStudent.fotoEstudiante || foto} alt="photo" className="photoView" />
        <div className='centerInfor'>
          <div className='information'>
            <p>{courseStudent.estudianteNombre} {courseStudent.estudianteApellido}</p>
            <p>{courseStudent.estudianteDocumento}</p>
            <p>{courseStudent.curso}</p>
            <p>Estudiante</p>
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
    </div>
  )
}