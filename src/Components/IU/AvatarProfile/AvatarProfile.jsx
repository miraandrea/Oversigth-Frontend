import React from 'react'
import Avatar from '@mui/material/Avatar'

export const AvatarProfile = ({name, photo}) => {
  return <Avatar alt={name} src={photo}/>
}
