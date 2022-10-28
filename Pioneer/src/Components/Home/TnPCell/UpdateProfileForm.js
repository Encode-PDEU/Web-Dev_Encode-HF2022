import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { db, auth } from "../../../firebase";
import { doc, Timestamp, collection, setDoc } from "firebase/firestore";

import PlacementCellNavbar from "../../Navigation/PlacementCellNavbar";

const UpdateProfileForm = ({ closeModal, applyEmail }) => {
  useEffect(() => {
  }, [applyEmail]);

  const navigate = useNavigate();

  const [cellData, setCellData] = useState({
    collegeName: "",
    email: "",
    phone: "",
    address: "",
    url: "",
    studentsNo: "",
    about: "",
    error: null,
    loading: false,
  });

  const {
    collegeName,
    email,
    phone,
    address,
    url,
    studentsNo,
    about,
    error,
    loading,
  } = cellData;

  const handleChange = (e) => {
    setCellData({ ...cellData, [e.target.name]: e.target.value });
  };

  const submitApplication = async (e) => {
    e.preventDefault();
    setCellData({ ...cellData, error: null, loading: true });

    const colRef = collection(db, "PlacementCellDetails");

    if (
      !collegeName ||
      !email ||
      !phone ||
      !address ||
      !url ||
      !studentsNo ||
      !about
    ) {
      setCellData({ ...cellData, error: "All fields are required" });
    } else {
      try {
        const id = localStorage.getItem("registerId");
        const newId = auth.currentUser.uid;
        await setDoc(doc(db, "PlacementCellDetails", newId), {
          uid: newId,
          collegeName,
          email,
          phone,
          address,
          url,
          studentsNo,
          about,
          createdAt: Timestamp.fromDate(new Date()),
        });

        setCellData({
          collegeName: "",
          email: "",
          phone: "",
          address: "",
          url: "",
          studentsNo: "",
          about: "",
          error: null,
          loading: false,
        });

        navigate("/tnpcell/profile");

      } catch (error) {
        setCellData({ ...cellData, error: error.message, loading: false });
      }
    }
  };

  return (
    <>
      <PlacementCellNavbar />
      <section className="text-gray-600 body-font relative">
        <form onSubmit={submitApplication}>
          <div className="container px-5 py-16 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                Enter your College Information
              </h1>
            </div>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-full">
                  <div className="relative">
                    <label for="skills" className="leading-7 text-sm text-gray-600">
                      College Name
                    </label>
                    <input
                      type="text"
                      id="collegeName"
                      name="collegeName"
                      value={collegeName}
                      onChange={handleChange}
                      placeholder="Enter your College Name"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label for="title" className="leading-7 text-sm text-gray-600">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      placeholder="Enter your email Address"
                      onChange={handleChange}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-full hidden">
                  <div className="relative">
                    <label for="title" className="leading-7 text-sm text-gray-600">
                      company Email
                    </label>
                    <input
                      type="email"
                      id="applyEmail"
                      name="applyEmail"
                      value={applyEmail}
                      placeholder="Enter your email Address"
                      onChange={handleChange}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label for="title" className="leading-7 text-sm text-gray-600">
                      Phone Number
                    </label>
                    <input
                      type="phone"
                      id="phone"
                      name="phone"
                      value={phone}
                      placeholder="Enter Placement cell's phone Number"
                      onChange={handleChange}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label for="title" className="leading-7 text-sm text-gray-600">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={address}
                      placeholder="Enter your College Address"
                      onChange={handleChange}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label for="title" className="leading-7 text-sm text-gray-600">
                      College Website URL
                    </label>
                    <input
                      type="text"
                      id="url"
                      name="url"
                      value={url}
                      placeholder="Enter your College Website URL"
                      onChange={handleChange}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label for="skills" className="leading-7 text-sm text-gray-600">
                      No. of Students for Interview
                    </label>
                    <input
                      type="text"
                      id="studentsNo"
                      name="studentsNo"
                      value={studentsNo}
                      placeholder="Enter the number of students for interview"
                      onChange={handleChange}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label for="skills" className="leading-7 text-sm text-gray-600">
                      Tell us about your College/University
                    </label>
                    <textarea
                      type="text"
                      id="about"
                      name="about"
                      value={about}
                      placeholder="Enter brief information about College/University"
                      onChange={handleChange}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                {error ? <p style={{ color: "red" }}>{error}</p> : null}
                <div className="p-2 w-full">
                  <button
                    type="submit"
                    disabled={loading}
                    onSubmit={submitApplication}
                    className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
                  >
                    {loading ? "Applying ..." : "Submit"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default UpdateProfileForm;