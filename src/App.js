import './App.css';
import { useState } from 'react';

// Import Components
import { Login } from './Components/Pages/Login/Login';
import { HomeAdmin } from './Components/Pages/HomeAdmin/HomeAdmin';
import { ViewUsersAdmin } from './Components/Pages/ViewUsersAdmin/ViewUsersAdmin';
import { DisableUsers } from './Components/Pages/DisableUsers/DisableUsers';
import { HomeTeac } from './Components/Pages/HomeTeac/HomeTeac';
import { HomeStudent } from './Components/Pages/HomeStudent/HomeStudent';
import { ViewUsersDocente } from './Components/Pages/ViewUsersDocente/ViewUsersDocente';
import { ProfileUsers } from './Components/Pages/ProfileUsers/ProfileUsers';
import { PrivaterRoute } from './Components/IU/PrivaterRoute/PrivaterRoute';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

function App() {

  let authentication = localStorage.getItem("authentication")
  const [isLogged] = useState(authentication)

  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path='/' element={<Login />} />
          <Route element={<PrivaterRoute isLogged={isLogged} />} >
            <Route path='/Administrador' element={<HomeAdmin />} />
            <Route path='/Usuario_Administrador/:name' element={<ViewUsersAdmin />} />
            <Route path='/Habilitar' element={<DisableUsers />} />
            <Route path='/Perfil' element={<ProfileUsers />} />
            <Route path='/Docente' element={<HomeTeac />} />
            <Route path='/Estudiante' element={<HomeStudent />} />
            <Route path='/Usuario_Docente/:name' element={<ViewUsersDocente />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;