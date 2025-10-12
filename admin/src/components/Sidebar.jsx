import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets_admin/assets";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
  const { atoken } = useContext(AdminContext);
  const {dtoken} = useContext(DoctorContext);
  return (
    <div className="min-h-screen bg-white border-r border-gray-200">
      {atoken && (
        <ul className="mt-5 text-[#515151]">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 broderprimary" : ""
              }`
            }
            to={"/admin-dashboard"}
          >
            <img src={assets.home_icon} alt="home_iocn" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 broderprimary" : ""
              }`
            }
            to={"/all-apointments"}
          >
            <img src={assets.appointment_icon} alt="appointment_icon" />
            <p>Appointments</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 broderprimary" : ""
              }`
            }
            to={"/add-doctor"}
          >
            <img src={assets.add_icon} alt="add_icon" />
            <p>Add Doctor</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 broderprimary" : ""
              }`
            }
            to={"/doctor-list"}
          >
            <img src={assets.people_icon} alt="people_icon" />
            <p>Doctor List</p>
          </NavLink>
        </ul>
      )}
      {dtoken && (
        <ul className="mt-5 text-[#515151]">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 broderprimary" : ""
              }`
            }
            to={"/doctor-dashboard"}
          >
            <img src={assets.home_icon} alt="home_iocn" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 broderprimary" : ""
              }`
            }
            to={"/doctor-Appointments"}
          >
            <img src={assets.appointment_icon} alt="appointment_icon" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 broderprimary" : ""
              }`
            }
            to={"/doctor-profile"}
          >
            <img src={assets.people_icon} alt="people_icon" />
            <p className="hidden md:block">My Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
