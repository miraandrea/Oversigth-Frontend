import React from 'react'
import './CardStudent.css'

export const CardStudent = ({ course2 }) => {

  return (
    <div>
      <div className="cards">
        <div className="cardInfo">
          <div className="inputsInfo">
            <input disabled type="text" value={course2.titulo} readonly onmousedown="return false;" id="inputTitle" />
            <p className='fecha'>{course2.fecha} </p>
          </div>
          <div className="inputsDescription">
            <textarea disabled name="" className='descriptionTeacher' cols="30" rows="10" value={course2.descripcionDocente} readonly onmousedown="return false;"></textarea>
            <textarea disabled name="" className='descriptionStudent' cols="30" rows="10" value={course2.descripcionEstudiante} readonly onmousedown="return false;"></textarea>
          </div>
          <div className="inputSignature">
            <input disabled className='signTeacher' type="text" name="" id="signTeacher" value={course2.firmaDocente} readonly onmousedown="return false;" />
            <input disabled className='signStudent' type="text" name="" id="signStudent" value={course2.firmaEstudiante} readonly onmousedown="return false;" />
          </div>
        </div>
      </div>
    </div>
  )
}