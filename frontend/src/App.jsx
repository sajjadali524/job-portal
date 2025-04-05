import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Header from "./components/Header/Header";
import Jobs from "./pages/Jobs";
import Browse from "./pages/Browse";
import UserProfile from "./pages/UserProfile";
import Footer from "./components/Footer/Footer";
import Companies from "./pages/recruiter/Companies";
import Job from "./pages/recruiter/Job";
import { useSelector } from "react-redux";
import CreateCompany from "./pages/recruiter/CreateCompany";
import CompanySetup from "./pages/recruiter/CompanySetup";

const App = () => {
  const { user } = useSelector(store => store.auth);
  return (
    <div className="pt-14">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/view-profile" element={<UserProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />


          <Route path="/recruiter/companies" element={<Companies />} />
          <Route path="/recruiter/jobs" element={<Job />} />
          <Route path="/recruiter/companies/create" element={<CreateCompany />} />
          <Route path="/recruiter/companies/:id" element={<CompanySetup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;