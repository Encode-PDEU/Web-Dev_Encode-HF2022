import React, { useState } from "react";
import { Box, Typography, makeStyles, Button } from "@material-ui/core";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";

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

const Signup = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail(email);
    setPassword(password);
    setName(name);
    setConfirmPassword(confirmPassword);

    if (!email || !password || !name || !confirmPassword) {
      setError("Please enter a valid username and password");
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    }
    if (password.length >= 6 && password === confirmPassword) {
      try {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await setDoc(doc(db, "User", result.user.uid), {
          uid: result.user.uid,
          name,
          email,
          password,
          createdAt: Timestamp.fromDate(new Date()),
        });

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setError(null);

        navigate("/");
      } catch (err) {}
    }
  };
  const loginPath = {
    color: "blue",
    textDecoration: "none",
    fontSize: "1.2rem",
  };
  return (
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
          <label className={classes.label}>Password </label>
          <input
            type="password"
            name="password"
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter Your Password"
            className={classes.input}
          />
        </div>
        <div className={classes.input_container}>
          <label className={classes.label}>Confirm Password </label>
          <input
            type="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            id="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Enter Your Password Again"
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
          Register
        </Button>
        <Link to="/login" style={loginPath}>
          <p>Already have an account ? Login</p>
        </Link>
      </form>
    </div>
  );
};

export default Signup;
