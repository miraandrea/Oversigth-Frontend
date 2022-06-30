import axios from "axios";
import Cookies from "universal-cookie";
import { IoMdHome } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { IoExitOutline } from "react-icons/io5";
import React, { useState } from "react";
import {
  MdMenu,
  MdKeyboardArrowLeft,
} from "react-icons/md";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

//components
import { AvatarProfile } from "../../IU/AvatarProfile/AvatarProfile";
import { ProfileFooter } from "../../Layout/ProfileFooter/ProfileFooter";

//material ui
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

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

export const ProfileUsers = () => {

  const [value, setValue] = useState(0);

  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const cookies = new Cookies();
  const rol = window.localStorage.getItem("rol")
  let routes = ""

  const [photos, setPhotos] = useState([]);

  if (rol == "Administrator") {
    routes = "/Administrador"
    const idUserAdm = cookies.get("idAdministrador");
    axios
      .get(`http://localhost:4000/v1/administrators/${idUserAdm}`)
      .then((response) => getAllPhotos(response.data))
      .catch((error) => console.log(error));
  }
  else if (rol == "Teacher") {
    routes = "/Docente"
    const idUserDoce = cookies.get("idDocente")
    axios
      .get(`http://localhost:4000/v1/teachers/${idUserDoce}`)
      .then((response) => getAllPhotos(response.data))
      .catch((error) => console.log(error));
  }
  else if (rol == "Student") {
    routes = "/Estudiante"
    const idUserEstu = cookies.get("idEstudiante")
    axios
      .get(`http://localhost:4000/v2/students/${idUserEstu}`)
      .then((response) => getAllPhotos(response.data))
      .catch((error) => console.log(error));
  }

  const getAllPhotos = (data) => {
    axios
      .get(`http://localhost:4000/v1/decode/${data}`)
      .then((response) => setPhotos(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex", heigh: "40vh" }}>
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
            <Typography
              component="h1"
              variant="h4"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
              fontFamily="pacifico">
              Oversigth
            </Typography>
            <IconButton color="inherit" >
              {photos.length > 0 ? (
                <>
                  <AvatarProfile key={photos[0]} name={photos[0].nombre} photo={photos[0].foto} />
                </>
              ) : (
                <AvatarProfile />
              )}
            </IconButton>
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
              <div className="menu">
                <ListItemButton >
                  <ListItemIcon>
                    <NavLink to={routes}>
                      <IoMdHome className="iconmenu" />
                    </NavLink>
                  </ListItemIcon>
                  <ListItemText primary="Inicio" />
                </ListItemButton>

                <ListItemButton >
                  <ListItemIcon>
                    <IoExitOutline onClick={() => signOff()} className="iconmenu" />
                  </ListItemIcon>
                  <ListItemText primary="Salir" />
                </ListItemButton>
              </div>
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
            <ProfileFooter />
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
                <NavLink to={routes}>
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
  cookies.remove("idDocente", { path: "/" });
  cookies.remove("idEstudiante", { path: "/" });
  localStorage.clear()
  window.location.href = "/";
};