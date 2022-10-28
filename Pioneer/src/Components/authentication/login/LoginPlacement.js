import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth} from "../../../firebase";

const LoginPlacement = () => {
  const loginPath = {
    color: "blue",
    textDecoration: "none",
    fontSize: "1.2rem",
  };

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
    loading: false,
  });

  const { email, password, error, loading } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!email || !password) {
      setData({ ...data, error: "All fields are required" });
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      localStorage.setItem("loginId", result.user.uid);

      setData({
        email: "",
        password: "",
        error: null,
        loading: false,
      });

      navigate("/tnpcell");
    } catch (err) {
      setData({ ...data, error: err.message, loading: false });
    }
  };

  return (
    <VStack spacing="10px" onSubmit={handleSubmit}>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          value={email}
          type="email"
          name="email"
          placeholder="Enter Your Email Address"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={password}
            name="password"
            onChange={handleChange}
            type={show ? "text" : "password"}
            placeholder="Enter password"
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
        {loading ? "Logging in ..." : "Login"}
      </Button>
      <Link to="/forgetPassword" style={loginPath}>
        <p>Forgot Password?</p>
      </Link>
      <Link to="/" style={loginPath}>
        <p>Don't have an account? Register</p>
      </Link>
    </VStack>
  );
};

export default LoginPlacement;
