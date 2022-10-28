import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import { Box, Container, useToast, Text } from "@chakra-ui/react";

import { useAuth } from "../../../contexts/AuthContext";

const ForgetPassword = () => {
  const loginPath = {
    color: "blue",
    textDecoration: "none",
    fontSize: "1.2rem",
  };

  const navigate = useNavigate();
  const { forgotPassword } = useAuth();
  const toast = useToast();

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      toast({
        description: `An email is sent to ${email} for password reset instructions.`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="xl" centerContent style={{ marginTop: 120 }}>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Text fontSize="4xl" fontFamily="Work sans" textAlign="center">
          Forgot Password
        </Text>
        <VStack spacing="10px" onSubmit={handleSubmit}>
          <FormControl id="email" isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              value={email}
              type="email"
              name="email"
              placeholder="Enter Your Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>


          <Button
            colorScheme="blue"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Link to="/login" style={loginPath}>
            <p>Go to Login Page</p>
          </Link>
        </VStack>
      </Box>
    </Container>
  );
};

export default ForgetPassword;
