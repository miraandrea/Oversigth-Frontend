import React, { useEffect, useState } from 'react'
import { CardStudent } from '../../IU/CardStudent/CardStudent'
import Cookies from 'universal-cookie/es6';
import axios from 'axios';
import jwtDecode from "jwt-decode";
import './MainStudent.css'
import { AiOutlineFileSearch } from "react-icons/ai";

export const MainStudent = ({ course2 }) => {

  // const cookies = new Cookies();

  // const documento = (cookies.get("idStudent"))

  // console.log(documento);

  // const [record, setRecord] = useState([""]);

  // const UrlTokenRecord = "http://localhost:4000/v2/students/" + documento + "/observers";

  // useEffect(() => {
  //   const getRecord = () => {
  //     axios.get(UrlTokenRecord)
  //       .then((res) => {
  //         const token = jwtDecode(res.data)
  //         setRecord(token.results)
  //       })
  //       .catch((error) => console.log(error))
  //   };
  //   getRecord();
  // }, []);

  return (
    <div >
      {/* {record.map((record, index) => ( */}
        <CardStudent course2={course2}/>
      {/* ))} */}
    </div>
  )
}