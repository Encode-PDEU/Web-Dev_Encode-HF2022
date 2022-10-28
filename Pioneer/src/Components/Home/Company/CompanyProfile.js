import React, { useState, useEffect } from "react";
import NavbarCompany from "../../Navigation/NavbarCompany";
import { db, auth } from "../../../firebase";
import {
  collection,
  getDocs,
} from "firebase/firestore";

const CompanyProfile = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const Id = auth.currentUser.uid;
    const colRef = collection(db, "companyData");

    const docs = await getDocs(colRef);

    getDocs(colRef)
      .then((snapShot) => {
        let info = [];
        snapShot.forEach((doc) => {
          if (doc.id === Id) {
            info.push({ ...doc.data(), id: doc.id });
          }
        });
        setData(info);
      })
      .catch((err) => {
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <NavbarCompany />

      {data.map((item) => {
        console.log(item)
        return (
          <>
            <div className="flex bg-gray-100 rounded-xl m-3 shadow-xl">
              <main className="flex-col bg-indigo-50 w-full ml-4 pr-6">
                <div className="text-center p-4 bg-white mt-3 rounded-xl shadow-lg">
                  <p className="text-4xl font-bold text-gray-700 ">
                    {item.companyName}
                  </p>
                </div>

                <div className="flex justify-between mt-4 space-x-4 s">
                  <div className="bg-white p-3 w-1/3 rounded-xl shadow-lg flex items-center justify-around">
                    <div className="text-center">
                      <p className="text-xl font-bold text-gray-800">Email</p>
                      <span className="text-gray-500">{item.email}</span>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </>
        );
      })}
    </>
  );
};

export default CompanyProfile;
