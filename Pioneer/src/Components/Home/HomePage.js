import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

import SignupCompany from "../authentication/signup/SignupCompany";
import SignupPlacement from "../authentication/signup/SignupPlacement";

const HomePage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <h2 className="font-medium text-3xl">
          Welcome to Hiring-Cell !
        </h2>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab>Register as Company</Tab>
            <Tab>Register as Placement Cell</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SignupCompany />
            </TabPanel>
            <TabPanel>
              <SignupPlacement />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
