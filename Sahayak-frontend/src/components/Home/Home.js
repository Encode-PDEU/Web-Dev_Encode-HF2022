import React, { useState } from "react";
import { Box, Typography, makeStyles, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ParkIcon from "@mui/icons-material/Park";
import WcIcon from "@mui/icons-material/Wc";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
const useStyles = makeStyles({
  headerImage: {
    width: "100%",
    height: "50vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "1000",
    height: "100vh",
  },

  headerText: {
    textAlign: "center",
    fontSize: "30px",
    color: "#3d3d29",
  },
  boxBtn: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
    alignItems: "center",
    flexDirection: "column",
  },
  btn: {
    backgroundColor: "#008fb3",
    alignItems: "center",
    color: "white",
    fontSize: "20px",
    width: "500px",

    "&:hover": {
      backgroundColor: "#005266",
    },
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  dropDown: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "500px",
    marginTop: "20px",
    marginBottom: "20px",
  },
  facility: {
    padding: "10px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "300px",
    border: "1px solid grey",
  },
});

const Home = () => {
  const classes = useStyles();

  const [clicked, setClicked] = useState(true);

  return (
    <>
      <Box className={classes.container}>
        <Box className={classes.headerImage}>
          <img
            src="./images/logo2.png"
            alt="SAHAYAK-THE HELPING HAND"
            className={classes.img}
          />
        </Box>
        <Box className={classes.header}>
          <Typography className={classes.headerText}>
            Add Restaurents, Clinics, Hospitals, Public Toilets, Gardens
            Assessible For Divyangjans
          </Typography>
        </Box>

        <Box className={classes.boxBtn}>
          <Button className={classes.btn} onClick={() => setClicked(!clicked)}>
            <Typography variant="h6">ADD PLACES</Typography>
          </Button>
          {!clicked ? (
            <>
              <Box className={classes.dropDown}>
                <Link to="/restaurant" className={classes.link}>
                  <Box className={classes.facility}>
                    <RestaurantIcon />
                    <Typography style={{ marginLeft: "30px" }}>
                      Add Restaurant
                    </Typography>
                  </Box>
                </Link>
                <Link to="/clinic" className={classes.link}>
                  <Box className={classes.facility}>
                    <LocalHospitalIcon />
                    <Typography style={{ marginLeft: "30px" }}>
                      Add Clinic
                    </Typography>
                  </Box>
                </Link>
                <Link to="/parks" className={classes.link}>
                  <Box className={classes.facility}>
                    <ParkIcon />
                    <Typography style={{ marginLeft: "30px" }}>
                      Add Parks
                    </Typography>
                  </Box>
                </Link>
                <Link to="/toilets" className={classes.link}>
                  <Box className={classes.facility}>
                    <WcIcon />
                    <Typography style={{ marginLeft: "30px" }}>
                      Add Public Toilets
                    </Typography>
                  </Box>
                </Link>
              </Box>
            </>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Home;
