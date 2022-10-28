import { React, useState, useEffect } from "react";
import PlacementCellNavbar from "../../Navigation/PlacementCellNavbar";
import { Link } from "react-router-dom";

import { db, auth } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";

const Profile = () => {

  const [data, setdata] = useState([]);

  const getCellData = async () => {
    const Id = auth.currentUser.uid;

    const colRef = collection(db, "PlacementCellDetails");


    getDocs(colRef)
      .then((snapShot) => {
        let info = [];
        snapShot.forEach((doc) => {
          if (doc.id === Id) {
            info.push({ ...doc.data(), id: doc.id });
          }
        });
        setdata(info);
      })
      .catch((err) => {
      });
  };

  useEffect(() => {
    getCellData();
  }, []);

  return (
    <>
      <PlacementCellNavbar />
      <div>
        <Link to="/tnpcell/updateprofile">
          <button className="absolute right-10 text-white bg-blue-500 border-0 py-2 px-3 focus:outline-none hover:bg-blue-600 rounded text-md">
            Add/Edit Profile
          </button>
        </Link>
        {data.map((item) => {
          return (
            <>
              <div className="flex bg-gray-100 rounded-xl m-3 shadow-xl">
                <main className="flex-col bg-indigo-50 w-full ml-4 pr-6">
                  <div className="text-center p-4 bg-white mt-3 rounded-xl shadow-lg">
                    <p className="text-4xl font-bold text-gray-700 ">
                      {item.collegeName}
                    </p>
                  </div>

                  <div className="flex justify-between mt-4 space-x-4 s">
                    <div className="bg-white p-3 w-1/3 rounded-xl shadow-lg flex items-center justify-around">
                      <div className="text-center">
                        <p className="text-xl font-bold text-gray-800">ADDRESS</p>
                        <span className="text-gray-500">{item.address}</span>
                      </div>
                    </div>

                    <div className="bg-white w-1/3 p-3 rounded-xl shadow-lg flex items-center justify-around">
                      <div className="text-center">
                        <p className="text-xl font-bold text-gray-800">
                          NIRF
                        </p>
                        <span className="text-gray-500">44</span>
                      </div>
                    </div>

                    <div className="bg-white w-1/3 p-3 rounded-xl shadow-lg flex items-center justify-around">
                      <div className="text-center">
                        <p className="text-xl font-bold text-gray-800">
                          College Website
                        </p>
                        <a className="text-blue-500 cursor-pointer">{item.url}</a>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between space-x-4">
                    <div className="bg-white mt-5 w-full flex flex-wrap py-6 rounded shadow-md">
                      <div className="lg:w-1/2 px-6">
                        <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                          About Us
                        </h2>
                        <p className="mt-1">{item.about}</p>
                      </div>
                      <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                        <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                          EMAIL
                        </h2>
                        <a className="text-indigo-500 leading-relaxed">
                          {item.email}
                        </a>
                        <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">
                          PHONE
                        </h2>
                        <p className="leading-relaxed">{item.phone}</p>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Profile;
