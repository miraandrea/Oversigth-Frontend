import "./Header.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { Search } from "../../IU/Search/Search";
import IconButton from "@mui/material/IconButton";
import React, { useState } from "react";
import { AvatarProfile } from "../../IU/AvatarProfile/AvatarProfile";

export const Header = ({ search, setSearch }) => {

  const handleGoViewProfile = () => {
    return (window.location = "/perfil");
  };

  const cookies = new Cookies();
  const rol = window.localStorage.getItem("rol")

  const [photos, setPhotos] = useState([]);

  if (rol == "Administrator") {
    const idUserAdm = cookies.get("idAdministrador");
    axios
      .get(`http://localhost:4000/v1/administrators/${idUserAdm}`)
      .then((response) => getAllPhotos(response.data))
      .catch((error) => console.log(error));
  }
  else if (rol == "Teacher") {
    const idUserDoce = cookies.get("idDocente")
    axios
      .get(`http://localhost:4000/v1/teachers/${idUserDoce}`)
      .then((response) => getAllPhotos(response.data))
      .catch((error) => console.log(error));
  }
  else if (rol == "Student") {
    const idUserEstu = cookies.get("idEstudiante")
    axios
      .get(`http://localhost:4000/v2/students/${idUserEstu}`)
      .then((response) => getAllPhotos(response.data))
      .catch((error) => console.log(error));
  }

  const getAllPhotos = (data) => {
    axios
      .get(`http://localhost:4000/v1/decode/${data}`)
      .then((response) => setPhotos(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="containerHeader">
      <div className="textLogo">
        <h1>Oversigth</h1>
      </div>
      <Search search={search} setSearch={setSearch} />
      <IconButton color="inherit" onClick={handleGoViewProfile}>
        {photos.length > 0 ? (
          <>
            <AvatarProfile key={photos[0]} name={photos[0].nombre} photo={photos[0].foto} />
          </>
        ) : (
          <AvatarProfile />
        )}
      </IconButton>
    </div>
  );
};