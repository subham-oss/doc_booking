import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { Appcontext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";

const DoctorAppointments = () => {
  const {
    dtoken,
    appointments,
    getappointments,
    CompleteAppointment,
    CancelAppointment,
  } = useContext(DoctorContext);
  const { calculateage } = useContext(Appcontext);
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
    if (dtoken) {
      getappointments();
    }
  }, [dtoken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border border-gray-200 rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b border-gray-200">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b border-gray-200 hover:bg-gray-50"
            key={index}
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2 ">
              <img
                className="w-8 rounded-full"
                src={item.userData.image}
                alt="user_image"
              />
              <p>{item.userData.name}</p>
            </div>
            <div>
              <p className="text-xs inline border broderprimary px-2 rounded-full">
                {item.payment ? "ONLINE" : "CASH"}
              </p>
            </div>
            <p className="max-sm:hidden">{calculateage(item.userData.dob)}</p>
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>
            <p>${item.amount}</p>
            {item.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-500 text-xs font-medium">Completed</p>
            ) : (
              <div className="flex">
                <img
                  onClick={() => CancelAppointment(item._id)}
                  className="w-10 cursor-pointer "
                  src={assets.cancel_icon}
                  alt="cancel_icon"
                />
                <img
                  onClick={() => CompleteAppointment(item._id)}
                  className="cursor-pointer w-10"
                  src={assets.tick_icon}
                  alt="tick_icon"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
