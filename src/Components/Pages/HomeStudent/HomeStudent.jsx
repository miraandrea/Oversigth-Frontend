// import React from 'react'

// export const HomeStudent = () => {
//   return (
//     <div>

//     </div>
//   )
// }


import axios from "axios";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Cookies from "universal-cookie/es6";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import React, { useEffect, useState } from "react";
import { NavBar } from "../../Layout/NavBar/NavBar";
import CssBaseline from "@mui/material/CssBaseline";
import { MainTeacher } from "../../Layout/MainTeacher/MainTeacher";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import fotoBuscar from "../../../Img/buscador.jfif";
import './HomeStudent.css'
import { AiOutlineFileSearch } from "react-icons/ai";

import {
  MdMenu,
  MdKeyboardArrowLeft,
} from "react-icons/md";
import { BarMenuStudent } from "../../Layout/BarMenuStudent/BarMenuStudent";
import { MainStudent } from "../../Layout/MainStudent.jsx/MainStudent";


import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { IoExitOutline } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { Header } from "../../Layout/Header/Header";

const drawerWidth = 220;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

export const HomeStudent = () => {

  // const [value, setValue] = useState(0);


  // const [open, setOpen] = useState(false);
  // const toggleDrawer = () => {
  //   setOpen(!open);
  // };

  // const [courses, setCourses] = useState([]);
  // const cookies = new Cookies()
  // const idUser = cookies.get("idEstudiante")

  // const UrlTokenCourse = `http://localhost:4000/v2/students/${idUser}/observers`;
  
  // useEffect(() => {
  //   const getCourses = () => {
  //     axios.get(UrlTokenCourse)
  //       .then((res) => {
  //         getToken(res.data)
  //       })
  //       .catch((error) => console.log(error))

  //   };
  //   getCourses();
  // }, []);

  // const getToken = (data) => {
  //   axios.get(`http://localhost:4000/v1/decode/${data}`)
  //       .then((res) => setCourses(res.data))
  //       .catch((error) => console.log(error))
  // }

  // const [search, setSearch] = useState("")
  // const [loading, setloading] = useState(true)

  // console.log(courses);
  // const UrlSearchCourse = "http://localhost:4000/v1/courses/0" + search;

  // useEffect(() => {
  //   const getSearch = () => {
  //     axios.get(UrlSearchCourse)
  //       .then((res) => user(res.data))
  //       .catch((error) => console.log(error))

  //   }
  //   getSearch();
  // }, []);

  // const user = (data) => {
  //   setloading(false)
  //   setCourses(data.results[0])
  // }

  // const character = courses.filter((character) =>
  //   character.nombre.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  // )




  const [value, setValue] = useState(0);

  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const cookies = new Cookies()
  const idUser = cookies.get("idEstudiante")

  const UrlTokenCourse = `http://localhost:4000/v2/students/${idUser}/observers`;

  useEffect(() => {
    const getCourses = () => {
      axios.get(UrlTokenCourse)
        .then((res) => {
          getToken(res.data)
        })
        .catch((error) => console.log(error))

    };
    getCourses();
  }, []);
  
  const [search, setSearch] = useState("")
  const [loading, setloading] = useState(true)
  const [courses, setCourses] = useState([]);

  const getToken = (data) => {
    axios.get(`http://localhost:4000/v1/decode/${data}`)
      .then((res) => user(res.data))
      .catch((error) => console.log(error))
  }

  // const UrlSearchCourse = "http://localhost:4000/v1/courses/0" + search;

  // useEffect(() => {
  //   const getSearch = () => {
  //     axios.get(UrlSearchCourse)
  //       .then((res) => user(res.data))
  //       .catch((error) => console.log(error))

  //   }
  //   getSearch();
  // }, []);

  const user = (data) => {
    setloading(false)
    setCourses(data)
  }

  const character = courses.filter((character) =>
    character.titulo.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  )

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex",heigh:"40vh" }}>
        <CssBaseline />
        <AppBar open={open} >
          <Toolbar
            sx={{
              pr: "24px",
            }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}>
                <div className="nav_bar">
              <MdMenu />
              </div>
            </IconButton>
              <Header filter={search} setSearch={setSearch} />
          </Toolbar>
        </AppBar>
        <div className="nav_drawer">
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <MdKeyboardArrowLeft />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              <BarMenuStudent />
            </List>
          </Drawer>
        </div>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}>
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <section className="mainCardStudent">
              {loading ? (
                <div id="contenedor">
                  <div class="loader" id="loader">Loading...</div>
                </div>
              ) : character.length > 0 ? (
                character.map((course2, index) => (
                  <MainStudent key={index} course2={course2} />
                ))
              ) : (
                <div className="photoSearch">
                  <img src={fotoBuscar} alt="buscar" />
                  <p>
                    No tiene anotacione <strong>"{search}"</strong>.
                  </p>
                </div>
              )}
            </section>

            {/* <section className="studentCard">
            <div className="history">
              <AiOutlineFileSearch className='FileSearch' />
              <h3>Historial</h3>
            </div>
            {courses.map((course2, index) => (
                  <MainStudent key={index} course2={course2} />
                  ))}
              </section> */}
              {/* <MainTeacher key={courses.idcurso} courses={courses} /> */}
          </Container>
        </Box>
      </Box>
      <div className="nav_menu-phone">
        <Box>
          <BottomNavigation>
            <BottomNavigationAction 
            sx={{
              color: "#1976d2"
            }}
            label="" 
            icon={
              <NavLink to="/Estudiante">
                <IoMdHome />
              </NavLink>} />
            <BottomNavigationAction
            sx={{
              color: "#1976d2"
            }}
              label=""
              icon={<IoExitOutline onClick={() => signOff()} />}
            />
          </BottomNavigation>
        </Box>
      </div>
    </ThemeProvider>
  );
}

const cookies = new Cookies();

const signOff = () => {
  cookies.remove("idAdministrador", { path: "/" });
  localStorage.clear()
  window.location.href = "/";
};