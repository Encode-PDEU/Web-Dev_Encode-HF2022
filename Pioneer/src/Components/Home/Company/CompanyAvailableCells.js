import { React, useState, useEffect } from "react";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";

//pages
import NavbarCompany from "../../Navigation/NavbarCompany";
import CompanyHiringCellForm from "./CompanyHiringCellForm";

const CompanyAvailableCells = () => {
  const [data, setData] = useState([]);
  const [openModel, setOpenModel] = useState(false);

  const [cellEmail, setcellEmail] = useState({});

  const getCellPosts = async () => {
    const colRef = collection(db, "PlacementCellDetails");
    const docs = await getDocs(colRef);
    setData(docs.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getCellPosts();
  }, []);

  return (
    <>
      <NavbarCompany />
      {openModel && (
        <CompanyHiringCellForm
          cellEmail={cellEmail}
          closeModal={setOpenModel}
        />
      )}

      <h1 className="sm:text-2xl text-2xl font-semibold title-font mt-10 -mb-14 text-left px-11 text-gray-900">
        Available Placement Cells
      </h1>
      <section className="text-gray-600 body-font px-10">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {data.map((post) => {
              return (
                <div
                  key={post.collegeName}
                  className="lg:w-1/6 md:w-1/3 p-4 w-full border-2 mx-4 hover:shadow-lg border-gray-400 rounded-lg"
                >
                  <div className="mt-4">
                    <h3 className="text-gray-900 text-left title-font text-md -mt-4 mb-3 font-semibold">
                      {post.collegeName}
                    </h3>
                    <h2
                      className="text-gray-900 text-md mb-4 mt-6 text-left tracking-widest title-font"
                      style={{ fontSize: "0.75rem" }}
                    >
                      {post.about}
                    </h2>

                    <h2
                      className="text-blue-700 text-sm text-left tracking-widest title-font"
                      style={{ fontSize: "0.70rem" }}
                    >
                      {post.url}
                    </h2>

                    <h2
                      className="text-gray-900 mt-4 font-semibold text-sm text-left tracking-widest title-font"
                      style={{ fontSize: "0.80rem" }}
                    >
                      Phone: {post.phone}
                    </h2>

                    <h2
                      className="text-gray-800 text-xs mt-4 mb-3 text-left tracking-widest title-font"
                      style={{ fontSize: "0.75rem" }}
                    >
                      Address : {post.address}
                    </h2>

                    <p className="mt-1 text-gray-900 title-font text-lg text-left font-semibold">
                      {post.studentsNo} Students
                    </p>

                    <button
                      className="inline-flex-my-6 text-sky-500 border-0 py-2 px-4 mt-1 focus:outline-none hover:text-sky-600 rounded"
                      onClick={() => {
                        setOpenModel(true);
                        setcellEmail(post.email)
                        window.scrollTo(0, 0)
                      }}
                    >
                      Hire Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default CompanyAvailableCells;
