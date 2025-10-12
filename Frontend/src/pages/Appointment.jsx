import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AppContext } from "../context/AppContext.jsx";
import { assetspic } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docid } = useParams();
  const { doctors, currencySymbol, token, backendurl, getallitems } =
    useContext(AppContext);
  const dayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const navigate = useNavigate();
  const [doctorDitails, setDoctorDetails] = useState(null);
  const [docslots, setDocslots] = useState([]);
  const[docslot_booked,setDocslot_booked]=useState([])
  const [slotindex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const docotorfinder = async () => {
    const docfind = doctors.find((doc) => doc._id === docid);
    setDoctorDetails(docfind);

    setDocslot_booked(docfind.slots_booked)
  };
  const getAvailableSlots = async () => {
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date();
      currentDate.setDate(today.getDate() + i);

      let enddate = new Date();
      enddate.setDate(today.getDate() + i);
      enddate.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      let timeslots = [];
      while (currentDate < enddate) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;

        
        const isslotAvailable =
        docslot_booked[slotDate] &&
        docslot_booked[slotDate].includes(slotTime)
        ? false
        : true;
        if (isslotAvailable) {
          timeslots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocslots((prev) => [...prev, timeslots]);
    }
  };

  const bookedAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }
    try {
      const date = docslots[slotindex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;
      const { data } = await axios.post(
        backendurl + "/api/user/booked-appointment",
        { docId: docid, slotDate, slotTime },
        { headers: { token } }
      );
      if (data.success) {
        toast.success("Appointment booked successfully");
        getallitems();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    docotorfinder();
  }, [doctors, docid]);
  useEffect(() => {
    if(doctorDitails!=null){
      getAvailableSlots();
    }
  },[doctorDitails]);
  return (
    doctorDitails &&  (
      <div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="primary w-full sm:max-w-72 rounded-lg"
              src={doctorDitails.image}
              alt="docimg"
            />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {doctorDitails.name}{" "}
              <img
                className="w-5"
                src={assetspic.verified_icon}
                alt="verified"
              />
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <p>
                {doctorDitails.degree} - {doctorDitails.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {doctorDitails.experience}
              </button>
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assetspic.info_icon} alt="info_icon" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {doctorDitails.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {doctorDitails.fees}
              </span>
            </p>
          </div>
        </div>
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docslots.length &&
              docslots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotindex === index
                      ? "primary text-white"
                      : "border border-gray-200"
                  }`}
                  key={index}
                >
                  <p>{item[0] && dayOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docslots.length &&
              docslots[slotindex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? "primary text-white"
                      : "border border-gray-200"
                  }`}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
          <button
            onClick={bookedAppointment}
            className="primary text-white text-sm font-light px-14 py-3 rounded-full my-6 cursor-pointer"
          >
            Book an appointment
          </button>
        </div>
        <RelatedDoctors docId={docid} docspec={doctorDitails.speciality} />
      </div>
    )
  );
};

export default Appointment;
