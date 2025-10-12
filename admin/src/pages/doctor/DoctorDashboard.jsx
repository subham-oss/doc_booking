import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets_admin/assets";

const DoctorDashboard = () => {
  const {
    dtoken,
    dashboardData,
    DashData,
    CancelAppointment,
    CompleteAppointment,
  } = useContext(DoctorContext);
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
      dashboardData();
    }
  }, [dtoken]);

  return (
    DashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3 ">
          <div className="flex items-center gap-2 bg-white min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img
              className="w-14"
              src={assets.earning_icon}
              alt="earning_icon"
            />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                $ {DashData.earning}
              </p>
              <p className="text-gray-400">Earnings</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img
              className="w-14"
              src={assets.appointments_icon}
              alt="appointments_icon"
            />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {DashData.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img
              className="w-14"
              src={assets.patients_icon}
              alt="patients_icon"
            />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {DashData.pacient}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="flex items-center gap-2 px-4 py-4 mt-10 rounded-t border border-gray-100">
            <img src={assets.list_icon} alt="list_icon" />
            <p className="font-semibold">Latest Booking</p>
          </div>
          <div className="pt-4 border border-gray-100 border-t-0">
            {DashData.latestAppointment.map((item, index) => (
              <div
                className="flex items-center gap-3 px-6 py-3 hover:bg-gray-100"
                key={index}
              >
                <img
                  className="rounded-full w-10 "
                  src={item.userData.image}
                  alt="docimage"
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800">{item.userData.name}</p>
                  <p className="text-gray-600 font-medium">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">
                    Completed
                  </p>
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
      </div>
    )
  );
};

export default DoctorDashboard;
