import React from "react";
import { Link } from "react-router-dom";

import { Button, Box, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  btn: {
    backgroundColor: "#3b82f6",
    borderRadius: "10px",
  },
  btnLogo: {
    width: "20px",
    height: "20px",
    marginLeft: 8,
  },
  link: {
    textDecoration: "none",

    fontSize: 20,
    marginLeft: 20,
    "&:hover": {
      color: "grey",
    },
  },
});

const Navbar = () => {
  const classes = useStyles();

  return (
    <header class="text-gray-600 body-font">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to="/"
          class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <img
            src="/images/metatherapy_logo_with_text.png"
            alt="Logo Here"
            width={190}
          />
        </Link>
        <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <Link
            to="/videoConsult"
            class="mr-5 hover:text-gray-900"
            className={classes.link}
          >
            Video Consult
          </Link>
          <Link
            to="/medicines"
            class="mr-5 hover:text-gray-900"
            className={classes.link}
          >
            Medicines
          </Link>
          <Link
            to="/labTests"
            class="mr-5 hover:text-gray-900"
            className={classes.link}
          >
            Lab Tests
          </Link>
          <Link
            to="/surgeries"
            class="mr-5 hover:text-gray-900"
            className={classes.link}
          >
            Surgeries
          </Link>
          <Link
            to="/about"
            class="mr-5 hover:text-gray-900"
            className={classes.link}
          >
            About Us
          </Link>
        </nav>
        <Button variant="contained" color="primary" className={classes.btn}>
          <Typography>Login/Sign up</Typography>
          <img
            src="/images/arrow-forward.png"
            alt="=>"
            className={classes.btnLogo}
          />
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
