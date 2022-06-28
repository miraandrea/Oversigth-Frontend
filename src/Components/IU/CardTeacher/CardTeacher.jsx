// import React from 'react'
// import './CardTeacher.css'
// import photo from '../ImgProfile/ejemplo.jpg'
// import { ViewProfileTeacher } from '../ViewProfileTeacher/ViewProfileTeacher'
// import Modal from "@material-ui/core/Modal";

// export const CardTeacher = ({ course1 }) => {

//   console.log(course1.curso);
//   const [openGroup, setOpenGroup] = React.useState(false);
//   const handleOpenGroup = () => {
//     setOpenGroup(true);
//   };
//   const handleCloseGroup = () => {
//     setOpenGroup(false);
//   };

//   const viewProfile = (
//     <div className="paper1">
//       <ViewProfileTeacher />
//       <div className="btn_Cancel">
//         <button className="cancel" onClick={handleCloseGroup}>Cancelar</button>
//       </div>
//     </div>
//   )
//   return (
//     <div className="teachercard">
//       {/* <div className="card">
//         <img src={course.foto || photo} alt='photo' onClick={handleOpenGroup} />
//         <p>{course.curso}</p>
//         <p>{course.directorGrupo}</p>
//         <p>si</p>
//       </div> */}
//       <div className="card">
//         <img src={photo} alt='photo' onClick={handleOpenGroup} />
//         <p>6*A</p>
//         <p>paola</p>
//         <p>si</p>
//       </div>
//       <Modal open={openGroup} onClose={handleCloseGroup}>
//         {viewProfile}
//       </Modal>
//     </div>
//   )
// }

// import React from 'react'

// export const CardTeacher = ({ course1 }) => {
//   return (
//     <div>
//       <p>paola</p>
//       <p>{course1.curso}</p>
//     </div>
//   )
// }

import React from 'react';
import Card1 from '@mui/material/Card';
import foto from '../ImgProfile/group.webp'
import { CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import photo from '../ImgProfile/ejemplo.jpg'
import { ViewProfileTeacher } from '../ViewProfileTeacher/ViewProfileTeacher'
import Modal from "@material-ui/core/Modal";

export const CardTeacher = ({ course1 }) => {

  // const [openGroup, setOpenGroup] = React.useState(false);
  // const handleOpenGroup = () => {
  //   setOpenGroup(true);
  // };
  // const handleCloseGroup = () => {
  //   setOpenGroup(false);
  // };

  // const viewProfile = (
  //   <div className="paper1">
  //     <ViewProfileTeacher />
  //     <div className="btn_Cancel">
  //       <button className="cancel" onClick={handleCloseGroup}>Cancelar</button>
  //     </div>
  //   </div>
  // )

  return (
    <div className='containerTeacherCard'>
      <Card1 sx={{ maxWidth: 170 }} >
        <CardActionArea>
          <CardMedia
            component="img"
            height="120"
            image={course1.foto || foto}
            // onClick={handleOpenGroup} 
            alt={course1.nombre}/>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {course1.curso}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {course1.directorGrupo}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card1>
      {/* <Modal open={openGroup} onClose={handleCloseGroup}>
          {viewProfile}
      </Modal> */}
    </div>
  );
}

