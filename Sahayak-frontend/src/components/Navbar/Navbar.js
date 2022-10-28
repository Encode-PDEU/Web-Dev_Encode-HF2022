import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  Box,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";

import DrawerComponent from "./DrawerComponent";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useAuth } from "../../contexts/AuthContexts";

const useStyles = makeStyles((theme) => ({
  component: {
    backgroundColor: "#2d234a",
    height: "64px",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  container: {
    display: "flex",
    flexDirection: "row",

    alignItems: "center",
    // justifyContent: "space-between",
  },

  logo: {
    fontSize: 26,
    display: "flex",
    flexDirection: "row",
    width: 200,
  },
  mainPages: {
    display: "flex",
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",
    // marginLeft: 30,
  },
  page: {
    marginRight: 20,
    fontSize: 20,
    width: 120,

    "&:hover": {
      backgroundColor: "#f15550",
      color: "white",

      borderRadius: "18px",
    },
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    height: 30,
  },
  logoLink: {
    textDecoration: "none",
    color: "inherit",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "center",
  },
  loginBox: {
    display: "flex",
    marginLeft: "auto",
  },
  btnLogin: {
    display: "flex",

    color: "white",
  },
  //   imageBox: {
  //     width: "50px",
  //     height: "30px",
  //   },
}));

const Navbar = () => {
  const classes = useStyles();

  const theme = useTheme();
  const { currentUser } = useAuth();
  console.log(currentUser);
  const navigate = useNavigate();

  const handleSignout = async () => {
    await signOut(auth);

    navigate("/login");
  };

  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMatch);

  return (
    <AppBar position="static" className={classes.component}>
      <Toolbar className={classes.container}>
        {isMatch ? (
          <>
            <Link to="/" className={classes.logoLink}>
              <Box className={classes.imageBox}>
                {/* <img
                  src="./images/logo.png"
                  alt="SAHAYAK"
                  width="200px"
                  height="55px"
                /> */}
                <Typography variant="h4">SAHAYAK</Typography>
              </Box>
            </Link>

            <DrawerComponent />
          </>
        ) : (
          <>
            <Box className={classes.logo}>
              <Link to="/" className={classes.logoLink}>
                {/* <img
                  src="./images/logo.png"
                  alt="SAHAYAK"
                  width="200px"
                  height="55px"
                /> */}
                <Typography variant="h4">SAHAYAK</Typography>
              </Link>
            </Box>
            <Box className={classes.mainPages}>
              <Link to="/" className={classes.link}>
                <Typography
                  variant="h6"
                  color="inherit"
                  className={classes.page}
                >
                  HOME
                </Typography>
              </Link>
              <Link to="/about" className={classes.link}>
                <Typography
                  variant="h6"
                  color="inherit"
                  className={classes.page}
                >
                  ABOUT
                </Typography>
              </Link>
              <Link to="/contact" className={classes.link}>
                <Typography
                  variant="h6"
                  color="inherit"
                  className={classes.page}
                >
                  CONTACT
                </Typography>
              </Link>
            </Box>
            <Box className={classes.loginBox}>
              {currentUser ? (
                <>
                  <Link to="/profile">Profile</Link>
                  <button onClick={handleSignout} className={classes.btnLogin}>
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/signup" className={classes.link}>
                    <Button className={classes.btnLogin}>
                      <Typography variant="h6" color="white">
                        Login/Singup
                      </Typography>
                    </Button>
                  </Link>
                </>
              )}
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
