import React, { useState } from "react";
import Common from "./Common";
import { Box, Typography, makeStyles, Button } from "@material-ui/core";

import { db } from "../../firebase";
import { Timestamp, collection, addDoc } from "firebase/firestore";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    marginTop: "30px",
  },
  input: {
    marginTop: "20px",
    marginBottom: "15px",
    display: "flex",
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "flex-start",
    width: "600px",
  },
  label: {
    fontSize: "30px",
    // width: "30%",
  },
  inputBox: {
    padding: "10px",
    marginLeft: "30px",
    // width: "60%",
    width: "300px",
    border: "1px solid grey",
    borderRadius: "5px",
    fontSize: "17px",
  },
  checkBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "600px",
    height: "100%",
    marginTop: "15px",
  },
  btn: {
    marginTop: "28px",
    backgroundColor: "#008fb3",
    alignItems: "center",
    color: "white",
    fontSize: "15px",
    width: "200px",

    "&:hover": {
      backgroundColor: "#005266",
    },
  },
});

const Clinic = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkedOne, setCheckedOne] = useState(false);
  const [checkedTwo, setCheckedTwo] = useState(false);
  const [checkedThree, setCheckedThree] = useState(false);
  const [checkedFour, setCheckedFour] = useState(false);
  const [checkedFive, setCheckedFive] = useState(false);

  const handleChangeOne = () => {
    setCheckedOne(!checkedOne);
  };
  const handleChangeTwo = () => {
    setCheckedTwo(!checkedTwo);
  };
  const handleChangeThree = () => {
    setCheckedThree(!checkedThree);
  };
  const handleChangeFour = () => {
    setCheckedFour(!checkedFour);
  };
  const handleChangeFive = () => {
    setCheckedFive(!checkedFive);
  };
  const submitFormData = async (e) => {
    e.preventDefault();
    setName(name);
    setLocation(location);
    setLoading(true);
    setError(null);
    if (!name || !location) {
      setError("Please fill all the fields");
      setLoading(false);
    }
    const colRef = collection(db, "clinic");

    const newDoc = await addDoc(colRef, {
      name,
      location,

      createdAt: Timestamp.fromDate(new Date()),
    });

    setName("");
    setLocation("");
    setLoading(false);
    setError(null);
  };
  return (
    <>
      <Box className={classes.container}>
        <Common name="Clinic" />
        <form className={classes.form}>
          <Box className={classes.input}>
            <label className={classes.label}>
              Enter Name
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={classes.inputBox}
              />
            </label>
          </Box>
          <Box className={classes.input}>
            <label className={classes.label}>
              Enter Location
              <input
                type="text"
                name="location"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={classes.inputBox}
              />
            </label>
          </Box>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "600px",
              marginTop: "30px",
            }}
          >
            <Typography style={{ fontSize: "30px" }}>Facilities</Typography>
          </Box>
          <Box className={classes.checkBox}>
            {/* <Facility facility={arr} />
             */}
            <label>
              <input
                type="checkbox"
                checked={checkedOne}
                onChange={handleChangeOne}
              />
              Braille Signage
            </label>
            <label>
              <input
                type="checkbox"
                checked={checkedTwo}
                onChange={handleChangeTwo}
              />
              Handrails
            </label>
            <label>
              <input
                type="checkbox"
                checked={checkedThree}
                onChange={handleChangeThree}
              />
              Ramps
            </label>
            <label>
              <input
                type="checkbox"
                checked={checkedFour}
                onChange={handleChangeFour}
              />
              Lifts
            </label>
            <label>
              <input
                type="checkbox"
                checked={checkedFive}
                onChange={handleChangeFive}
              />
              Accessible Help Centers
            </label>
          </Box>
          <Box className={classes.input}>
            <label className={classes.label}>
              Upload Images
              <input
                type="file"
                name="file"
                id="file"
                onChange={(e) => setName(e.target.files[0])}
                className={classes.inputBox}
              />
            </label>
          </Box>
          <Button
            type="submit"
            value="Submit"
            className={classes.btn}
            onClick={submitFormData}
          >
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
};

export default Clinic;
