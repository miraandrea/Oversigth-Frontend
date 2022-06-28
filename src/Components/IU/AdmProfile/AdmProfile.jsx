import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie/es6';
import './AdmProfile.css'

export const AdmProfile = ({ user }) => {

  // const [information, setInformation] = useState([])
  // const UrlToken = "http://localhost:4000/v1/decode/"+ user ;

  //     axios.get(UrlToken)
  //     .then((res) => setInformation(res.data[0]))
  //     .catch((error) => console.log(error))

  return (
    <div className='Text'>
      <div className='Texto1'>
        <p>Documento:        {user.documento}</p>
        <p>Nombre:           {user.nombre}</p>
        <p>Apellido:         {user.apellido}</p>
        <p>Fecha:            {user.fecnac}</p>
      </div>
    </div>
  )
}
