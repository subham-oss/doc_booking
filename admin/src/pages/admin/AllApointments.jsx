import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { Appcontext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";

const AllApointments = () => {
  const { atoken, getAllAppointments, Appointments,cancelAppointment } = useContext(AdminContext);
  const {calculateage,currency}= useContext(Appcontext)
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const slotDateFormat = (slotDate) => {
    const datearray = slotDate.split("_");
    return (
      datearray[0] + " " + month[Number(datearray[1]) - 1] + " " + datearray[2]
    );
  };
  useEffect(() => {
    getAllAppointments();
  }, [atoken]);
  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border  border-gray-300 rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-gray-300 ">
          <p>#</p>
          <p>patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {Appointments.map((item, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b border-gray-300 hover:bg-gray-50 hover:border-gray-50"
            key={index}
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img className="w-8 rounded-full" src={item.userData.image} alt="User_image" />
              <p>{item.userData.name}</p>
            </div>
            <p className="max-sm:hidden">{calculateage(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)} , {item.slotTime}</p>
            <div className="flex items-center gap-2">
              <img className="w-8 rounded-full bg-gray-200" src={item.docData.image} alt="doctor_image" />
              <p>{item.docData.name}</p>
            </div>
            <p>{currency} {item.amount}</p>
            {
              item.cancelled?
              <p  className="text-red-400 font-medium text-xs">Cancelled</p>
              : item.isCompleted ? <p className="text-green-500 font-medium text-xs">Completed</p> :<img onClick={()=>cancelAppointment(item._id)} className="w-10 cursor-pointer" src={assets.cancel_icon} alt="cancel_icon" />
            }
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllApointments;
