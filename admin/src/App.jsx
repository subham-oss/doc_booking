import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./pages/admin/DashBoard";
import AllApointments from "./pages/admin/AllApointments"
import AddDoctor from "./pages/admin/AddDoctor";
import DoctorList from "./pages/admin/DoctorList";
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import DoctorProfile from "./pages/doctor/DoctorProfile";
const App = () => {
  const { atoken } = useContext(AdminContext);
  const {dtoken}=useContext(DoctorContext);
  return (atoken || dtoken) ? (
    <div className="bg-[#f5f5f5]">
      <ToastContainer />
      <Navbar/>
      <div className="flex items-start">
        <Sidebar/>
        <Routes>
          <Route path="/" element={<></>}/>
          <Route path="/admin-dashboard" element={<DashBoard/>}/>
          <Route path="/all-apointments" element={<AllApointments/>}/>
          <Route path="/add-doctor" element={<AddDoctor/>}/>
          <Route path="/doctor-list" element={<DoctorList/>}/>
          <Route path="/doctor-dashboard" element={<DoctorDashboard/>}/>
          <Route path="/doctor-Appointments" element={<DoctorAppointments/>}/>
          <Route path="/doctor-profile" element={<DoctorProfile/>}/>
        </Routes>
      </div>
    </div>
  ) : (
    <div>
      <Login />
      <ToastContainer />
    </div>
  );
};

export default App;
