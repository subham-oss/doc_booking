import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import axios from "axios";

const DoctorProfile = () => {
  const { dtoken, getprofiledata, setProfileData, ProfileData,Backenduri } =
    useContext(DoctorContext);
  const [edit, setEdit] = useState(false);
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const getUpdateProfile = async () => {
    try {
      const updatedata = {
        address: {line1, line2},
        fees: ProfileData.fees,
        available: ProfileData.available,
      };
      const {data}= await axios.post(Backenduri + '/api/admin/update',updatedata,{headers:{dtoken}})
      if (data.success) {
        toast.success(data.message);
        getprofiledata()
        setEdit(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    if (dtoken) {
      getprofiledata();
    }
  }, [dtoken]);

  return (
    ProfileData && (
      <div>
        <div className="flex flex-col gap-4 m-5">
          <div>
            <img
              className="primary bg-opacity-80 w-full rounded-lg sm:max-w-64"
              src={ProfileData.image}
              alt="doctor_image"
            />
          </div>
          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
              {ProfileData.name}
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {ProfileData.degree} - {ProfileData.speciality}
              </p>
              <button className="py-0.5 px-2 border border-gray-300 text-xs rounded-full">
                {ProfileData.experience}
              </button>
            </div>

            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
                About:
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {ProfileData.about}
              </p>
            </div>
            <p className="text-gray-600 font-medium mt-4">
              Appointment fee:
              <span className="text-gray-800 ">
                ${" "}
                {edit ? (
                  <input
                    type="number"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }))
                    }
                    value={ProfileData.fees}
                  />
                ) : (
                  ProfileData.fees
                )}
              </span>
            </p>
            <div className="flex gap-2 py-2">
              <p>Address</p>
              <p className="text-sm">
                {edit ? (
                  <input
                    type="text"
                    onChange={(e) =>
                     setLine1(e.target.value)
                    }
                    value={line1}
                  />
                ) : (
                  ProfileData.address.line1
                )}
                <br />
                {edit ? (
                  <input
                    type="text"
                    onChange={(e) =>
                      setLine2(e.target.value)
                    }
                    value={line2}
                  />
                ) : (
                  ProfileData.address.line2
                )}
              </p>
            </div>
            <div className="flex gap-1 pt-2">
              <input
                checked={ProfileData.available}
                type="checkbox"
                onChange={() =>
                  edit &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                id="Available"
              />
              <label htmlFor="Available">Available</label>
            </div>
            {edit ? (
              <button
                onClick={() => getUpdateProfile()}
                className="px-4 py-1 border broderprimary text-sm rounded-full mt-5 hover:text-white hoverprimary transition-all"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setEdit(true)}
                className="px-4 py-1 border broderprimary text-sm rounded-full mt-5 hover:text-white hoverprimary transition-all"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
