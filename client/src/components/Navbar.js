import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useSelector, useDispatch } from 'react-redux';
import { userTypes } from "../utils.js";
import { setLogout, setMode } from '../state.js';

function Header() {

  const theme = useTheme();
  const dispatch = useDispatch();

  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  const user = useSelector((state) => state.user);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (isOpen) => (event) => {
    setIsDrawerOpen(isOpen);
  };

  const scrollToHome = () => {
    const homeSection = document.getElementById('home-section');
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/'
    }
  };

  const scrollToAboutUs = () => {
    const aboutUsSection = document.getElementById('about-us-section');
    if (aboutUsSection) {
      aboutUsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/'
    }
  };

  const scrollToContactUs = () => {
    const contactUsSection = document.getElementById('contact-us-section');
    if (contactUsSection) {
      contactUsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/'
    }
  };

  const handleLoginBtn = () => {
    window.location.href = '/login'
  };

  const handleLogout = async () => {
    await dispatch(setLogout());
    window.location.href = '/login';
  };

  return (
    <>
      <AppBar
        position="fixed"
        style={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.default, height: 80 }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: isMd ? "none" : "block" }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ alignItems: "center", cursor: "pointer" }}
          >
            <Button href="/">
              <img
                alt="logo"
                src="/img/logo.png"
                style={{ height: 70, width: 200 }}
              />
            </Button>
          </Typography>
          <div style={{ marginLeft: 60 }}></div>
          {isMd && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                "& > :not(:last-child)": { mr: "1em" },
                flexGrow: 1,
                justifyContent: 'flex-end',
              }}
            >
              <Box>
                <Button
                  key="home"
                  onClick={scrollToHome}
                  color="inherit"
                  sx={{
                    color: theme.palette.text.default,
                    fontSize: "18px",
                    fontWeight: "500",
                    marginRight: "1em",
                    textDecoration: "none",
                    "&:hover": {
                      color: theme.palette.text.main,
                      fontWeight: "bold",
                    },
                  }}
                >
                  Home
                </Button>
                <Button
                  key="about"
                  onClick={scrollToAboutUs}
                  color="inherit"
                  sx={{
                    color: theme.palette.text.default,
                    fontSize: "18px",
                    fontWeight: "500",
                    marginRight: "1em",
                    textDecoration: "none",
                    "&:hover": {
                      color: theme.palette.text.main,
                      fontWeight: "bold",
                    },
                  }}
                >
                  AboutUs
                </Button>
                <Button
                  key="contact"
                  onClick={scrollToContactUs}
                  color="inherit"
                  sx={{
                    color: theme.palette.text.default,
                    fontSize: "18px",
                    fontWeight: "500",
                    marginRight: "1em",
                    textDecoration: "none",
                    "&:hover": {
                      color: theme.palette.text.main,
                      fontWeight: "bold",
                    },
                  }}
                >
                  Contact Us
                </Button>
              </Box>
              <Box style={{ marginLeft: 'auto' }}>
                {user ? (
                  <span>
                    <Button
                      href="/userDashboard"
                      color="inherit"
                      sx={{
                        color: theme.palette.text.default,
                        fontSize: "18px",
                        fontWeight: "500",
                        marginRight: "1em",
                        textDecoration: "none",
                        "&:hover": {
                          color: theme.palette.text.main,
                          fontWeight: "bold",
                        },
                      }}
                    >
                      Profile
                    </Button>

                    <Button
                      onClick={handleLogout}
                      color="inherit"
                      sx={{
                        color: theme.palette.text.default,
                        fontSize: "18px",
                        fontWeight: "500",
                        textDecoration: "none",
                        "&:hover": {
                          color: theme.palette.text.main,
                          fontWeight: "bold",
                        },
                      }}
                    >
                      Logout
                    </Button>
                  </span>
                ) : (
                  <Button
                    href="/login"
                    color="inherit"
                    sx={{
                      color: theme.palette.text.default,
                      fontSize: "18px",
                      fontWeight: "500",
                      textDecoration: "none",
                      "&:hover": {
                        color: theme.palette.text.main,
                        fontWeight: "bold",
                      },
                    }}
                  >
                    Login
                  </Button>
                )}
              </Box>
              <IconButton onClick={() => dispatch(setMode())}>
                <Brightness4Icon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <List>
          <ListItem button onClick={scrollToHome}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={scrollToAboutUs}>
            <ListItemText primary="About Us" />
          </ListItem>
          <ListItem button onClick={scrollToContactUs}>
            <ListItemText primary="Contact Us" />
          </ListItem>
          <ListItem button onClick={handleLoginBtn}>
            <ListItemText primary="Login" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default Header;
