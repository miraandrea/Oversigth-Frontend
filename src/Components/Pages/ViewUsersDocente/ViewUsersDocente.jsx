import axios from "axios";
import Cookies from "universal-cookie";
import { useParams } from "react-router";
import { IoMdHome } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { IoExitOutline } from "react-icons/io5";
import { React, useState, useEffect } from "react";
import {
  MdMenu,
  MdKeyboardArrowLeft,
} from "react-icons/md";

//components
import { NavBar } from "../../Layout/NavBar/NavBar";
import fotoBuscar from "../../../Img/buscador.jfif";
import { Header } from "../../Layout/Header/Header";
import { MainTeacherUser } from "../../Layout/MainTeacherUser/MainTeacherUser";

//material iu 
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

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

export const ViewUsersDocente = () => {

  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const logOut = () => {
    return (window.location = "/");
  };

  const { name } = useParams()

  const URL = "https://oversigthapi.azurewebsites.net/v1/courses/" + name;

  useEffect(() => {
    const getCourses = () => {
      axios.get(URL)
        .then((res) => {
          setCourses(res.data)
        })
        .catch((error) => console.log(error))
    };
    getCourses();
  }, []);

  const [search, setSearch] = useState("")
  const [loading, setloading] = useState(true)
  const [courses, setCourses] = useState([]);

  const UrlSearchCourse = "https://oversigthapi.azurewebsites.net/v1/courses/0" + search;

  useEffect(() => {
    const getSearch = () => {
      axios.get(UrlSearchCourse)
        .then((res) => user(res.data))
        .catch((error) => console.log(error))
    }
    getSearch();
  }, []);

  const user = (data) => {
    setloading(false)
    setCourses(data.results[0])
  }

  const character = courses.filter((character) =>
    character.estudianteNombre.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  )

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} >
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
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
              <NavBar />
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
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <section className="mainCard">
              {loading ? (
                <div id="contenedor">
                  <div class="loader" id="loader">Loading...</div>
                </div>
              ) : character.length > 0 ? (
                character.map((courseStudent, index) => (
                  <MainTeacherUser key={index} courseStudent={courseStudent} />
                ))
              ) : (
                <div className="photoSearch">
                  <img src={fotoBuscar} alt="buscar" />
                  <p>
                    El curso <strong>"{search}"</strong> no se encontro.
                  </p>
                </div>
              )}
            </section>
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
                <NavLink to="/Docente">
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