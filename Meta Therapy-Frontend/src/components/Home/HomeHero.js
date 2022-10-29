import React from "react";
import AllSections from "./AllSections";
import { Button } from "@material-ui/core";

const HomeHero = () => {
  return (
    <>
      <section class="text-gray-600 body-font px-5">
        <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Skip the travel! <br />
              Take Online Doctor Consultation
            </h1>
            <h4 class="title-font sm:text-2xl text-2xl mb-2 mt-3 font-small text-gray-900">
              Private consultation + Video call · Starts at just ₹99
            </h4>
            <p class="mb-8 leading-relaxed">
              Experience clinic-like consultation through a video call with the
              doctor. Video consultation is available only on the metaTherapy.
            </p>
            <div class="flex mt-5 justify-center">
              <Button
                variant="contained"
                color="primary"
                style={{ backgroundColor: "#3b82f6", borderRadius: "10px" }}
                class="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
              >
                Consult Now
              </Button>
              <Button
                variant="contained"
                style={{ marginLeft: 10, borderRadius: "10px" }}
                class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
              >
                Find me the right doctor
              </Button>
            </div>
          </div>
          <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img src="images/metatherapy_vector.svg" width={400} alt="" />
          </div>
        </div>
      </section>
      <AllSections />
    </>
  );
};

export default HomeHero;
