import React, { useState } from "react";
import { Box, Typography, makeStyles, Button } from "@material-ui/core";

import { auth, db } from "../../firebase";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const useStyles = makeStyles({
  btn: {
    backgroundColor: "#008fb3",
    alignItems: "center",
    color: "white",
    fontSize: "15px",
    width: "179px",

    "&:hover": {
      backgroundColor: "#005266",
    },
  },
  label: {
    fontSize: "1.2rem",
    justifyContent: "center",
    textAlign: "left",
  },
  input: {
    padding: "10px 15px",
    border: "1px solid grey",
    borderRadius: "5px",
    marginTop: "10px",
    width: "400px",
    marginBottom: "10px",
    fontSize: "1.2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    marginTop: "40px",
  },
  input_container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    justifyContent: "flex-start",
  },
});

const Contact = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");
  const [phone, setPhone] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail(email);
    setPhone(phone);
    setName(name);
    setQuery(query);
    setError(null);

    if (!email || !phone || !name || !query) {
      setError("Please enter a valid details");
    }
    if (phone.length !== 10) {
      setError("Enter valid phone Number");
    }

    try {
      const colRef = collection(db, "contact us");

      const newDoc = await addDoc(colRef, {
        name,
        email,
        phone,
        query,
        createdAt: Timestamp.fromDate(new Date()),
      });
      setName("");
      setEmail("");
      setPhone("");
      setQuery("");
      setError(null);

      navigate("/");
    } catch (err) {}
  };
  return (
    <>
      <div className="form">
        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.input_container}>
            <label className={classes.label}>Name </label>
            <input
              type="name"
              name="name"
              required
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name"
              className={classes.input}
            />
          </div>
          <div className={classes.input_container}>
            <label className={classes.label}>Email </label>
            <input
              type="email"
              name="email"
              required
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              className={classes.input}
            />
          </div>
          <div className={classes.input_container}>
            <label className={classes.label}>Mobile Number </label>
            <input
              type="phone"
              name="phone"
              value={phone}
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="Enter Your Mobile Number"
              className={classes.input}
            />
          </div>
          <div className={classes.input_container}>
            <label className={classes.label}>Confirm Password </label>
            <input
              type="query"
              name="query"
              value={query}
              id="query"
              onChange={(e) => setQuery(e.target.value)}
              required
              placeholder="Enter Your Query"
              className={classes.input}
            />
          </div>
          {error ? <p style={{ color: "red" }}>{error}</p> : null}
          <Button
            width="100%"
            style={{ marginTop: 15 }}
            onClick={handleSubmit}
            className={classes.btn}
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default Contact;
