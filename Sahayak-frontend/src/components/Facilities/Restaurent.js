import React, { useState } from "react";
import Common from "./Common";
import { Box, Typography, makeStyles, Button } from "@material-ui/core";

import { db } from "../../firebase";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
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

const Restaurent = () => {
  const navigate = useNavigate();
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

  const getCheceker = () => {
    let arr = [];

    if (checkedOne) {
      arr.push("Braille Signage");
    }
    if (checkedTwo) {
      arr.push("Handrails");
    }
    if (checkedThree) {
      arr.push("Ramps");
    }
    if (checkedFour) {
      arr.push("Lifts");
    }
    if (checkedFive) {
      arr.push("Accessible Help Centers");
    }

    return arr;
  };
  const submitFormData = async (e) => {
    e.preventDefault();
    setName(name);
    setLocation(location);
    setLoading(true);
    setError(null);
    let check = getCheceker();
    if (!name || !location) {
      setError("Please fill all the fields");
      setLoading(false);
    }

    const colRef = collection(db, "restaurents");

    const newDoc = await addDoc(colRef, {
      name,
      location,
      facilities: check,
      createdAt: Timestamp.fromDate(new Date()),
    });

    setName("");
    setLocation("");
    setLoading(false);
    setError(null);

    navigate("/");
  };

  return (
    <>
      <Box className={classes.container}>
        <Common name="Restaurent" />
        <form className={classes.form} onSubmit={submitFormData}>
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
                id="1"
                checked={checkedOne}
                onChange={handleChangeOne}
              />
              Braille Signage
            </label>
            <label>
              <input
                id="2"
                type="checkbox"
                checked={checkedTwo}
                onChange={handleChangeTwo}
              />
              Handrails
            </label>
            <label>
              <input
                id="3"
                type="checkbox"
                checked={checkedThree}
                onChange={handleChangeThree}
              />
              Ramps
            </label>
            <label>
              <input
                id="4"
                type="checkbox"
                checked={checkedFour}
                onChange={handleChangeFour}
              />
              Lifts
            </label>
            <label>
              <input
                id="5"
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

export default Restaurent;
