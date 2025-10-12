import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const Adminprovider = (props) => {
  const [atoken, setatoken] = useState(
    localStorage.getItem("atoken") ? localStorage.getItem("atoken") : ""
  );
  const [Doctors, setDoctors] = useState([]);
  const [Appointments, setAppointments] = useState([]);
  const [DashData,setDashData]= useState(false);
  const Backenduri = import.meta.env.VITE_BACKEND_URI;
  const getAllItem = async () => {
    try {
      const { data } = await axios.post(
        Backenduri + "/api/doctor/all-doctors",
        {},
        { headers: { atoken } }
      );
      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const changeavailability = async (docid) => {
    try {
      const { data } = await axios.post(
        Backenduri + "/api/doctor/change-availability",
        { docid },
        { headers: { atoken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllItem();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(
        Backenduri + "/api/doctor/appointments",
        { headers: { atoken } }
      );
      if (data.success) {
        setAppointments(data.appointments.reverse());
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  const cancelAppointment = async (appointmentId)=>{
    try {
      const {data}= await axios.post(Backenduri + '/api/doctor/cancel-appointment',{appointmentId},{headers:{atoken}})
      if(data.success){
        toast.success(data.message)
        getAllAppointments()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
       toast.error(error.response.data.message);
      console.log(error);
    }
  }
  const getDashData = async()=>{
    try {
      const {data}= await axios.get(Backenduri + '/api/doctor/dashboard',{headers:{atoken}})
      if(data.success){
        setDashData(data.dashboardData)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }
  const value = {
    atoken,
    setatoken,
    Backenduri,
    Doctors,
    getAllItem,
    changeavailability,
    setAppointments,
    Appointments,
    getAllAppointments,
    cancelAppointment,
    getDashData,DashData
  };
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};
export default Adminprovider;
