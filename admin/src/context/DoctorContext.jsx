import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const DoctorContext = createContext();
const DoctorContextprovider = (props) => {
  const Backenduri = import.meta.env.VITE_BACKEND_URI;
  const [dtoken, setDtoken] = useState(
    localStorage.getItem("dtoken") ? localStorage.getItem("dtoken") : ""
  );
  const [appointments, setAppointments] = useState([]);
  const [DashData, setDashData] = useState(false);
  const [ProfileData, setProfileData] = useState(false);

  const getappointments = async () => {
    try {
      const { data } = await axios.get(Backenduri + "/api/admin/appointment", {
        headers: { dtoken },
      });
      if (data.success) {
        setAppointments(data.appointment.reverse());
        console.log(data.appointment);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const CompleteAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        Backenduri + "/api/admin/complete",
        { appointmentId },
        { headers: { dtoken } }
      );
      if (data.success) {
        toast.success(data.message);
        getappointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const CancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        Backenduri + "/api/admin/cancel",
        { appointmentId },
        { headers: { dtoken } }
      );
      if (data.success) {
        toast.success(data.message);
        getappointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const dashboardData = async () => {
    try {
      const { data } = await axios.get(Backenduri + "/api/admin/dashboard", {
        headers: { dtoken },
      });
      if (data.success) {
        setDashData(data.dashdata);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const getprofiledata = async () => {
    try {
      const { data } = await axios.get(Backenduri + "/api/admin/profile", {
        headers: { dtoken },
      });
      if (data.success) {
        setProfileData(data.profileData);
      }
       else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const value = {
    dtoken,
    setDtoken,
    Backenduri,
    appointments,
    setAppointments,
    getappointments,
    CompleteAppointment,
    CancelAppointment,
    dashboardData,
    setDashData,
    DashData,
    getprofiledata,
    setProfileData,
    ProfileData,
  };
  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};
export default DoctorContextprovider;
