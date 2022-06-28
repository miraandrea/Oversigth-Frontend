import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Cookies from 'universal-cookie/es6'
import { AdmProfile } from '../../IU/AdmProfile/AdmProfile'
import { Profile } from '../../IU/Profile/Profile'

export const ProfileFooter = () => {

    const [user, setUser] = useState([])

    let rol = localStorage.getItem("rol")
    const cookies = new Cookies()
    
    const profileAdmi = (idUser) => {
        axios
        .get(`https://oversigthapi.azurewebsites.net/v1/administrators/${idUser}`)
        .then((response) => getToken(response.data))
        .catch((error) => console.log(error))
    }
    
    const profileTeach = (idUser) => {
        axios
        .get(`https://oversigthapi.azurewebsites.net/v1/teachers/${idUser}`)
        .then((response) => getToken(response.data))
        .catch((error) => console.log(error))
    }
    
    const profileStude = (idUser) => {
        axios
        .get(`https://oversigthapi.azurewebsites.net/v2/students/${idUser}`)
        .then((response) => getToken(response.data))
        .catch((error) => console.log(error))
    }
    
    const getToken = (data) => {
        axios
        .get(`https://oversigthapi.azurewebsites.net/v1/decode/${data}`)
        .then((response) => setUser(response.data[0]))
        .catch((error) => console.log(error));
    }
    
    if(rol === "Administrator"){
        const idUser = cookies.get("idAdministrador")
        profileAdmi(idUser)
    }else if (rol === "Teacher"){
        const idUser = cookies.get("idDocente")
        profileTeach(idUser)
    }else if (rol === "Student"){
        const idUser = cookies.get("idEstudiante")
        profileStude(idUser)
    }

    return (
        <div>
            <Profile user={user}/>
        </div>
  )
}
