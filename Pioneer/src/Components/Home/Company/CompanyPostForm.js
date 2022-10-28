import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarCompany from "../../Navigation/NavbarCompany";
import {db } from "../../../firebase";
import {
  Timestamp,
  collection,
  addDoc,
} from "firebase/firestore";

const CompanyPostForm = () => {
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    companyName: "",
    email: "",
    phone: "",
    jobTitle: "",
    skills: "",
    requiredEmployees: "",
    lastDate: "",
    error: null,
    loading: false,
  });

  const {
    companyName,
    email,
    phone,
    jobTitle,
    skills,
    requiredEmployees,
    lastDate,
    error,
    loading,
  } = postData;

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const submitPostData = async (e) => {
    e.preventDefault();
    setPostData({ ...postData, error: null, loading: true });
    if (
      !companyName ||
      !jobTitle ||
      !email ||
      !phone ||
      !skills ||
      !requiredEmployees ||
      !lastDate
    ) {
      setPostData({
        ...postData,
        error: "Please fill all the fields",
        loading: false,
      });
    }
    const colRef = collection(db, "jobPostData");

    const newDoc = await addDoc(colRef, {
      companyName,
      email,
      phone,
      jobTitle,
      skills,
      requiredEmployees,
      lastDate,
      createdAt: Timestamp.fromDate(new Date()),
    });


    setPostData({
      companyName: "",
      jobTitle: "",
      skills: "",
      requiredEmployees: "",
      lastDate: "",
      error: null,
      loading: false,
    });

    navigate("/company/appliedcells");
  };

  return (
    <>
      <NavbarCompany />
      <form onSubmit={submitPostData}>
        <section className="text-gray-600 body-font relative">
          <div className="container px-5 py-16 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                Post Hiring Details
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                Fill your requirements here, We make sure to connect you with
                Placement Cell!
              </p>
            </div>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-full">
                  <div className="relative">
                    <label for="skills" className="leading-7 text-sm text-gray-600">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={companyName}
                      onChange={handleChange}
                      placeholder="Enter Your Company Name"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label for="skills" className="leading-7 text-sm text-gray-600">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      placeholder="Enter Your Email"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label for="skills" className="leading-7 text-sm text-gray-600">
                      Contact Number
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={phone}
                      onChange={handleChange}
                      placeholder="Enter Your Contact Number"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label for="title" className="leading-7 text-sm text-gray-600">
                      Job Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="jobTitle"
                      value={jobTitle}
                      onChange={handleChange}
                      placeholder="Enter Your Job Title"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label for="skills" className="leading-7 text-sm text-gray-600">
                      Skills Required
                    </label>
                    <input
                      type="text"
                      id="skills"
                      name="skills"
                      value={skills}
                      onChange={handleChange}
                      placeholder="Enter the Skills you are looking for"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label for="skills" className="leading-7 text-sm text-gray-600">
                      Employees Required
                    </label>
                    <input
                      type="text"
                      id="requiredEmployees"
                      name="requiredEmployees"
                      value={requiredEmployees}
                      onChange={handleChange}
                      placeholder="Enter the Number of Employees Required for Hiring"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      for="lastdate"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Last date to apply
                    </label>
                    <input
                      type="date"
                      id="lastDate"
                      name="lastDate"
                      value={lastDate}
                      onChange={handleChange}
                      placeholder="Enter the Last Date to Apply"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                {error ? <p style={{ color: "red" }}>{error}</p> : null}
                <div className="p-2 w-full">
                  <button
                    type="submit"
                    onSubmit={submitPostData}
                    disabled={loading}
                    className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
                  >
                    {loading ? "Posting ..." : "Submit"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  );
};

export default CompanyPostForm;
