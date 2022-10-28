import { BrowserRouter, Routes, Route } from "react-router-dom";
import CompanyAppliedCells from "./Components/Home/Company/CompanyAppliedCells";
import CompanyAvailableCells from "./Components/Home/Company/CompanyAvailableCells";
import CompanyHome from "./Components/Home/Company/CompanyHome";
import CompanyPostForm from "./Components/Home/Company/CompanyPostForm";
import NavbarCompany from "./Components/Navigation/NavbarCompany";
import Login from "./Components/authentication/Login";
import HomePage from "./Components/Home/HomePage";
import PlacementCell from "./Components/Home/TnPCell/PlacementCell";
import Feed from "./Components/Home/TnPCell/Feed";
import Profile from "./Components/Home/TnPCell/Profile";

import ForgetPassword from "./Components/authentication/login/ForgetPassword";
import AuthContextProvider from "./contexts/AuthContext";
import UpdateProfileForm from "./Components/Home/TnPCell/UpdateProfileForm";
import CompanyProfile from "./Components/Home/Company/CompanyProfile";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/company/home" element={<CompanyHome />} />
          <Route
            exact
            path="/company/appliedcells"
            element={<CompanyAppliedCells />}
          />
          <Route exact path="/companypostform" element={<CompanyPostForm />} />
          <Route
            exact
            path="/company/availablecells"
            element={<CompanyAvailableCells />}
          />
          <Route exact path="/tnpcell" element={<PlacementCell />} />
          <Route exact path="/tnpcell/feed" element={<Feed />} />
          <Route exact path="/tnpcell/profile" element={<Profile />} />
          <Route exact path="/profile" element={<CompanyProfile />} />
          <Route exact path="/forgetPassword" element={<ForgetPassword />} />
          <Route
            exact
            path="/tnpcell/updateprofile"
            element={<UpdateProfileForm />}
          />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
