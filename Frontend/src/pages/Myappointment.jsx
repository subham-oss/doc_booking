import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Myappointment = () => {
  const navigate = useNavigate()
  const { token, backendurl, getallitems } = useContext(AppContext);
  const [appointments, setappointments] = useState([]);
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
  const getuserAppointments = async () => {
    try {
      const { data } = await axios.get(backendurl + "/api/user/appointments", {
        headers: { token },
      });
      if (data.success) {
        setappointments(data.appointments.reverse());
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendurl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getuserAppointments();
        getallitems();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const initPay = (order) => {
    const option = {
      key: import.meta.env.VITE_REZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Apptointments Booking",
      description: "Appointment Booking",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const { data } = await axios.post(backendurl + "/api/user/verifyRazorpay",response,{headers:{token}})
          if(data.success){
            getuserAppointments();
            navigate("/my-appointments")
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(option);
    rzp.open();
  };
  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendurl + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getuserAppointments();
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b border-zinc-300">
        My appointments
      </p>
      <div>
        {appointments.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-zinc-300"
            key={index}
          >
            <div>
              <img
                className="w-32 bg-indigo-50"
                src={item.docData.image}
                alt="item_image"
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {item.docData.name}
              </p>
              <p>{item.docData.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Address:</p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:
                </span>{" "}
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>
            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled && item.payment && !item.isCompleted && <button   className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border border-zinc-200 bg-indigo-200">Paid</button>}
              {!item.cancelled && !item.payment && !item.isCompleted && (
                <buttuon
                  onClick={() => appointmentRazorpay(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border border-zinc-200 hoverprimary hover:text-white transition-all duration-300"
                >
                  Pay Online
                </buttuon>
              )}

              {!item.cancelled && !item.payment && !item.isCompleted &&(
                <buttuon
                  onClick={() => cancelAppointment(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border border-zinc-200 hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Cancel appointment
                </buttuon>
              )}

              {item.cancelled && !item.isCompleted && (
                <p className=" text-red-600 text-center sm:min-w-48 py-2 border border-red-600">
                  Appointment Cancelled
                </p>
              )}
              {
                item.isCompleted && <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">Completed</button> 
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myappointment;
