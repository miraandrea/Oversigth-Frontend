import React from 'react'
import { Navigate, Outlet } from 'react-router'

export const PrivaterRoute = ({ isLogged }) => {
  return isLogged ? <Outlet /> : <Navigate to='/' />
}
