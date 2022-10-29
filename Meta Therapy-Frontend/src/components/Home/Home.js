import React from "react";

// Home Components
import DownloadApp from "./DownloadApp";
import HomeHero from "./HomeHero";
import PatientsFeedback from "./PatientsFeedback";
import PatientsRecovered from "./PatientsRecovered";
import TopArticles from "./TopArticles";

const Home = () => {
  return (
    <>
      <HomeHero />
      <TopArticles />
      <PatientsRecovered />
      <PatientsFeedback />
      <DownloadApp />
    </>
  );
};

export default Home;
