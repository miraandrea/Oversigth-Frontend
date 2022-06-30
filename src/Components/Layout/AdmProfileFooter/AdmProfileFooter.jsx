import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie/es6';
import { AdmProfile } from '../../IU/AdmProfile/AdmProfile'
import { AvatarProfile } from '../../IU/AvatarProfile/AvatarProfile';
import { IconProfileAdm } from '../../IU/IconProfileAdm/IconProfileAdm'
import { ImgProfile } from '../../IU/ImgProfile/ImgProfile'
import { TextOversight } from '../../IU/TextOversight/TextOversight'
import './AdmProfileFooter.css'

export const AdmProfileFooter = () => {

  const [user, setUser] = useState("")
  const [photos, setPhotos] = useState([]);

  let rol = localStorage.getItem("rol")
  const cookies = new Cookies();

  

    if (rol === "Teacher"){
      const documento = (cookies.get("idTeacher"))
      const URL = "http://localhost:4000/v1/teacher/" + documento
  
      axios.get(URL)
           .then((res) => setUser(res.data))
           .catch((error) => console.log(error))
    } 
    if (rol === "Administrator"){

      const cookies = new Cookies();
      const idUser = cookies.get("idAdministrador");
      axios
        .get(`http://localhost:4000/v1/administrators/${idUser}`)
        .then((response) => getAllPhotos(response.data))
        .catch((error) => console.log(error));
    
    
      const getAllPhotos = (data) => {
        axios
          .get(`http://localhost:4000/v1/decode/${data}`)
          .then((response) => {
            setPhotos(response.data)
            setUser(response.data)
          })
          .catch((error) => console.log(error));
      };
    
      // const documento = (cookies.get("idAdministrador"))
      // const URL = "http://localhost:4000/v1/administrators/" + documento
  
      // axios.get(URL)
      //      .then((res) => setUser(res.data))
      //      .catch((error) => console.log(error))
    }
    if (rol === "Student"){
      const documento = (cookies.get("idStudent"))
      const URL = "http://localhost:4000/v2/students/" + documento
  
      axios.get(URL)
           .then((res) => setUser(res.data))
           .catch((error) => console.log(error))
    }
   
    console.log(photos);

  return (
    <div>

    <div className='contTextoOver'>
    <div className="iAdm">
      {/* <ImgProfile  img="ImgAdm"  /> */}
      {photos.length > 0 ? (
          photos.map((photo, index) => {
            return <AvatarProfile key={index} name={photo.nombre} photo={photo.foto} />;
          })
        ) : (
          <AvatarProfile />
        )}
    </div>
    <div className='TextOver-Profile'>
    <TextOversight text="oversight-profile" />

    </div>

    </div>
    <div className="hrtop">
      <AdmProfile user={user}/>
      </div>
      <IconProfileAdm  />

    </div>
  )
}
