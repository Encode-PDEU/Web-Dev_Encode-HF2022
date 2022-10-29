import React, { useState } from "react";
import { Box, Typography, makeStyles, Button } from "@material-ui/core";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

import { useNavigate, Link } from "react-router-dom";

const useStyles = makeStyles({
  input_container: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    margin: "10px",
  },
  button_container: {
    display: "flex",
    justifyContent: "center",
  },
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
const loginPath = {
  color: "blue",
  textDecoration: "none",
  fontSize: "1.2rem",
};

const Login = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail(email);
    setPassword(password);

    if (!email || !password) {
      setError("Please enter a valid username and password");
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      setEmail("");
      setPassword("");
      setError(null);

      navigate("/");
    } catch (err) {}
  };
  return (
    <div className="form">
      <form onSubmit={handleSubmit} className={classes.form}>
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
        {error ? <p style={{ color: "red" }}>{error}</p> : null}
        <Button
          width="100%"
          style={{ marginTop: 15 }}
          onClick={handleSubmit}
          className={classes.btn}
        >
          Login
        </Button>
        <Link to="/signup" style={loginPath}>
          <p>Don't have an account ? Register</p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
