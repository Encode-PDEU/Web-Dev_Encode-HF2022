import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";

const SignupPlacement = () => {
  const loginPath = {
    color: "blue",
    textDecoration: "none",
    fontSize: "1.2rem",
  };
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [data, setData] = useState({
    placementCellName: "",
    email: "",
    passworrd: "",
    confirmPassword: "",
    error: null,
    loading: false,
  });

  const { placementCellName, email, password, confirmPassword, error, loading } =
    data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!placementCellName || !email || !password) {
      setData({ ...data, error: "All fields are required" });
    }
    if (password !== confirmPassword) {
      setData({ ...data, error: "Passwords do not match" });
    }
    if (password.length < 6) {
      setData({ ...data, error: "Password must be at least 6 characters" });
    }
    if (password.length >= 6 && password === confirmPassword) {
      try {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await setDoc(doc(db, "placementCellData", result.user.uid), {
          uid: result.user.uid,
          placementCellName,
          email,
          createdAt: Timestamp.fromDate(new Date()),
        });
        setData({
          placementCellName: "",
          email: "",
          password: "",
          confirmPassword: "",
          error: null,
          loading: false,
        });

      navigate("/tnpcell");

      } catch (err) {
        setData({ ...data, error: err.message, loading: false });
      }
    }
  };

  return (
    <VStack spacing="5px" onSubmit={handleSubmit}>
      <FormControl id="first-name" isRequired>
        <FormLabel>Placement Cell Name</FormLabel>
        <Input
          placeholder="Enter Your Placement Cell Name"
          name="placementCellName"
          onChange={handleChange}
          value={placementCellName}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={handleChange}
          name="email"
          value={email}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={handleChange}
            name="password"
            value={password}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={handleChange}
            name="confirmPassword"
            value={confirmPassword}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      {error ? <p style={{ color: "red" }}>{error}</p> : null}
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading ? "Creating ..." : "Register"}
      </Button>
      <Link to="/login" style={loginPath}>
        <p>Already have an account ? Login</p>
      </Link>
    </VStack>
  );
};

export default SignupPlacement;
