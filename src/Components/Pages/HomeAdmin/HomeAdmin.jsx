import "./HomeAdmin.css";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie/es6";
import { MdGroupAdd } from "react-icons/md";
import { IoExitOutline } from "react-icons/io5";
import { useEffect, useState, React } from "react";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { IoMdHome, IoMdPersonAdd } from "react-icons/io";
import { MdMenu, MdKeyboardArrowLeft } from "react-icons/md";

//components
import { Main } from "../../Layout/Main/Main";
import { Header } from "../../Layout/Header/Header";
import fotoBuscar from "../../../Img/buscador.jfif";
import { GroupAdd } from "../../IU/GroupAdd/GroupAdd";
import { Register } from "../../IU/Register/Register";
import { BarMenu } from "../../Layout/BarMenu/BarMenu";

//material ui
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Modal from "@material-ui/core/Modal";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { NavLink } from "react-router-dom";

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

export const HomeAdmin = () => {
  const [open, setOpen] = useState(false);
  const [modalRegisterUsers, setModalRegisterUsers] = useState(false);
  const handleOpen = () => {
    setModalRegisterUsers(true);
  };
  const handleClose = () => {
    setModalRegisterUsers(false);
  };
  const bodyRegister = (
    <div className="modal">
      <Register />
      <div className="btn_CancelRegister">
        <button className="cancel" onClick={handleClose}>
          Cancelar
        </button>
      </div>
    </div>
  );
  const [openGroup, setOpenGroup] = useState(false);
  const handleOpenGroup = () => {
    setOpenGroup(true);
  };
  const handleCloseGroup = () => {
    setOpenGroup(false);
  };
  const bodyGroup = (
    <div className="modalGroup">
      <GroupAdd />
      <div className="btn_CancelRegister">
        <button className="cancel" onClick={handleCloseGroup}>
          Cancelar
        </button>
      </div>
    </div>
  );
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const UrlTokenCourse = "http://localhost:4000/v3/courses";

  useEffect(() => {
    const getCourses = () => {
      axios
        .get(UrlTokenCourse)
        .then((res) => {
          const token = jwtDecode(res.data);
          setloading(false);
          setCourses(token.results[0]);
        })
        .catch((error) => console.log(error));
    };
    getCourses();
  }, []);

  const [search, setSearch] = useState("");
  const [loading, setloading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getSearch = () => {
      axios
        .get(`http://localhost:4000/v1/courses/${search}`)
        .then((res) => user(res.data))
        .catch((error) => console.log(error));
    };
    getSearch();
  }, []);

  const user = (data) => {
    setloading(false);
    setCourses(data.results[0]);
  };

  const character = courses.filter((character) =>
    character.nombre.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex", heigh: "40vh" }}>
        <CssBaseline />
        <AppBar open={open}>
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
              }}>
              <IconButton onClick={toggleDrawer}>
                <MdKeyboardArrowLeft />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              <BarMenu />
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
            <section className="mainCard">
              {loading ? (
                <div id="contenedor">
                  <div class="loader" id="loader">Loading...</div>
                </div>
              ) : character.length > 0 ? (
                character.map((course, index) => (
                  <Main key={index} course={course} />
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
              icon={<IoMdHome />}
            />
            <BottomNavigationAction
              sx={{
                color: "#1976d2"
              }}
              label=""
              icon={<IoMdPersonAdd onClick={handleOpen} />}
            />
            <BottomNavigationAction
              sx={{
                color: "#1976d2"
              }}
              label=""
              icon={<MdGroupAdd onClick={handleOpenGroup} />}
            />
            <BottomNavigationAction
              sx={{
                color: "#1976d2"
              }}
              label=""
              icon={
                <NavLink to="/Habilitar">
                  <MdDoNotDisturbAlt />
                </NavLink>
              }
            />
            <BottomNavigationAction
              sx={{
                color: "#1976d2"
              }}
              label=""
              icon={<IoExitOutline onClick={() => signOff()} />}
            />
          </BottomNavigation>
          <Modal open={modalRegisterUsers} onClose={handleClose}>
            {bodyRegister}
          </Modal>
          <Modal open={openGroup} onClose={handleCloseGroup}>
            {bodyGroup}
          </Modal>
        </Box>
      </div>
    </ThemeProvider>
  );
};
const cookies = new Cookies();

const signOff = () => {
  cookies.remove("idAdministrador", { path: "/" });
  localStorage.clear();
  window.location.href = "/";
};