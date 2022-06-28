import React from 'react';
import './CardTeachUsers.css'

//components
import foto from '../ImgProfile/group.webp'
import { ViewProfileTeacher } from '../ViewProfileTeacher/ViewProfileTeacher';

//material ui
import Card1 from '@mui/material/Card';
import Modal from "@material-ui/core/Modal";
import { CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

export const CardTeachUsers = ({ courseStudent }) => {

  const [openGroup, setOpenGroup] = React.useState(false);

  const handleOpenGroup = () => {
    setOpenGroup(true);
  };
  const handleCloseGroup = () => {
    setOpenGroup(false);
  };

  const viewProfile = (
    <div className="modalTeacher">
      <ViewProfileTeacher courseStudent={courseStudent} />
      <div className="btn_Cancel">
        <button className="cancelTeacher" onClick={handleCloseGroup}>Cancelar</button>
      </div>
    </div>
  )

  return (
    <div className='borde'>
      <Card1 sx={{ maxWidth: 170 }} >
        <CardActionArea>
          <CardMedia
            component="img"
            height="120"
            image={courseStudent.fotoEstudiante || foto}
            alt={courseStudent.estudianteNombre}
            onClick={handleOpenGroup}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {courseStudent.estudianteNombre}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {courseStudent.curso}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card1>
      <Modal open={openGroup} onClose={handleCloseGroup}>
        {viewProfile}
      </Modal>
    </div>
  );
}