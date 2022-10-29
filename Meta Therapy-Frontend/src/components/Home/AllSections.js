import React from "react";

const AllSections = () => {
  return (
    <>
      <h2 class="text-2xl font-medium text-gray-900 title-font -mb-12 mt-10 pl-10 text-left">
        Luxurious services for everyone
      </h2>
      <section class="text-gray-600 body-font px-5">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-4">
            <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
              <div class="pb-6 rounded-md shadow-lg">
                <a class="block relative h-48 rounded overflow-hidden">
                  <img
                    alt="video"
                    class="object-cover object-center w-full h-full block"
                    src="images/video_consultation.jpg"
                  />
                </a>
                <div class="mt-4">
                  <h2 class="text-gray-900 title-font text-lg font-medium">
                    Instant Video Consultation
                  </h2>
                  <p class="mt-1">Connect within 30 secs</p>
                </div>
              </div>
            </div>
            <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
              <div class="pb-6 rounded-md shadow-lg">
                <a class="block relative h-48 rounded overflow-hidden">
                  <img
                    alt="medicine"
                    class="object-cover object-center w-full h-full block"
                    src="images/order_medicines.jpg"
                  />
                </a>
                <div class="mt-4">
                  <h2 class="text-gray-900 title-font text-lg font-medium">
                    Order Medicines
                  </h2>
                  <p class="mt-1">Essentials at your doorstep</p>
                </div>
              </div>
            </div>
            <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
              <div class="pb-6 rounded-md shadow-lg">
                <a class="block relative h-48 rounded overflow-hidden">
                  <img
                    alt="=tests"
                    class="object-cover object-center w-full h-full block"
                    src="images/lab_tests.jpg"
                  />
                </a>
                <div class="mt-4">
                  <h2 class="text-gray-900 title-font text-lg font-medium">
                    Lab Tests
                  </h2>
                  <p class="mt-1">Sample pickup at your home</p>
                </div>
              </div>
            </div>
            <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
              <div class="pb-6 rounded-md shadow-lg">
                <a class="block relative h-48 rounded overflow-hidden">
                  <img
                    alt="surgeries"
                    class="object-cover object-center w-full h-full block"
                    src="images/surgeries.jpg"
                  />
                </a>
                <div class="mt-4">
                  <h2 class="text-gray-900 title-font text-lg font-medium">
                    Surgeries
                  </h2>
                  <p class="mt-1">Safe and trusted surgery centers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AllSections;
