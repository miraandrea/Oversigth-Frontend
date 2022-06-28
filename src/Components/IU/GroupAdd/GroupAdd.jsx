import "./GroupAdd.css";
import axios from "axios";
import swal from '@sweetalert/with-react';
import { MdGroupAdd } from "react-icons/md";
import React, { useEffect, useState } from "react";

export const GroupAdd = () => {

  //token teacher
  const UrlTokenTeacher = 'https://oversigthapi.azurewebsites.net/v1/teachers';

  useEffect(() => {
    const getTeacher = () => {
      axios.get(UrlTokenTeacher)
        .then((res) => userTeacher(res.data))
        .catch((error) => console.log(error))
    }
    getTeacher();
  }, []);

  const [data, setData] = useState([" "]);

  const userTeacher = (data) => {
    const urlTeacher = "https://oversigthapi.azurewebsites.net/v1/decode/" + data;
    axios.get(urlTeacher).then((response) => {
      let dataArray = [];
      for (let index = 0; index < Object.keys(response.data[0]).length; index++) {
        dataArray.push(response.data[0][index]);
      }
      setData(dataArray);
    });
  }

  //imagen

  const [teacher, setTeacher] = useState("")
  const [name, setName] = useState("")
  const [image, setImage] = useState(null)

  let formdata = new FormData()
  const insert = (e) => {

    e.preventDefault()

    formdata.append("name", name)
    formdata.append("image", image)
    formdata.append("documentTeacher", teacher)

    axios.post("https://oversigthapi.azurewebsites.net/v5/courses", formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(res => {
        userGroup(res.data);
      })
      .catch(error => console.log(error))

  }
  const userGroup = (data) => {
    if (data) {
      swal("Exito!", "Se registro exitosamente", "success")
    }
    else {
      swal("Oops!", "No se pudo ragistrar el curso", "error");
    }
  }

  return (
    <form onSubmit={insert}>
      <div>
        <p className="textGroup">Agregar curso</p>
        <MdGroupAdd className='iconGroup' />
        <br />
        <hr className="lineGroup" />
        <div className="mainGroup">
          <div className="containerNameGroup">
            <input className="nameGroup" id="name" type="text" placeholder="Nombre Grupo" required onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="photoGroup">
            <input type="file" className="inputfile" onChange={e => setImage(e.target.files[0])} />
          </div>
          <br />
          <div className="selectDirector">
            <select
              className="select"
              onChange={(e) => setTeacher(e.target.value)}>
              <option>Seleccione un director de grupo</option>
              {data.map((el, index) => {
                return (
                  <option key={index}
                    value={el.documento}>
                    {el.nombre}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="btn_Registrar">
          <button type="submit" className="Registrar">Registrar</button>
        </div>
      </div>
    </form>
  );
};