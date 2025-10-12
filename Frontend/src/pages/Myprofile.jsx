import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { assetspic } from "../assets/assets_frontend/assets.js";
import axios from "axios";
import { toast } from "react-toastify";
const Myprofile = () => {
  const { userdata, setuserdata, token, backendurl, getUserData } =
    useContext(AppContext);
  const [isedit, setisedit] = useState(false);
  const [image, setimage] = useState(false);
  const updateuserprofiledata = async () => {
    try {
      const fromdata = new FormData();
      fromdata.append("name", userdata.name);
      fromdata.append("gender", userdata.gender);
      fromdata.append("phone", userdata.phone);
      fromdata.append("dob", userdata.dob);
      fromdata.append("address", JSON.stringify(userdata.address));
      image && fromdata.append("image", image);
      const { data } = await axios.post(
        backendurl + "/api/user/update-profile",
        fromdata,
        { headers: { token } }
      );
      if(data.success){
       toast.success(data.message);
       await getUserData();
       setisedit(false);
      setimage(false);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  };
  return (
    userdata && (
      <div className="max-w-lg flex flex-col gap-2 text-sm">
        {isedit ? (
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img
                className="w-36 rounded opacity-75"
                src={image ? URL.createObjectURL(image) : userdata.image}
                alt="image1"
              />
              <img
                className="w-10 absolute bottom-12 right-12"
                src={image ? "" : assetspic.upload_icon}
              />
            </div>
            <input
              onChange={(e) => setimage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img className="w-36 rounded" src={userdata.image} alt="user_image" />
        )}
        {isedit ? (
          <input
            className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
            type="text"
            value={userdata.name}
            onChange={(e) =>
              setuserdata((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p className="font-medium text-3xl mt-4 text-neutral-800">
            {userdata.name}
          </p>
        )}
        <hr className="bg-zinc-400 h-[1px] border-none" />
        <div>
          <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 text-neutral-700">
            <p className="font-medium">Email id:</p>
            <p className="text-blue-500">{userdata.email}</p>
            <p className="font-medium">Phone:</p>
            {isedit ? (
              <input
                className="bg-gray-100 max-w-52"
                type="number"
                value={userdata.phone}
                onChange={(e) =>
                  setuserdata((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p className="text-blue-400">{userdata.phone}</p>
            )}
            <p className="font-medium">Address:</p>
            {isedit ? (
              <p>
                <input
                  className="bg-gray-100"
                  onChange={(e) =>
                    setuserdata((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  value={userdata.address.line1}
                  type="text"
                />
                <br />
                <input
                  className="bg-gray-100"
                  onChange={(e) =>
                    setuserdata((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  value={userdata.address.line2}
                  type="text"
                />
              </p>
            ) : (
              <p className="text-gray-500">
                {userdata.address.line1}
                <br />
                {userdata.address.line2}
              </p>
            )}
          </div>
        </div>
        <div>
          <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 text-neutral-700 mt-3">
            <p className="font-medium">Gender:</p>
            {isedit ? (
              <select
                className="max-w-20 bg-gray-100"
                onChange={(e) =>
                  setuserdata((prev) => ({ ...prev, gender: e.target.value }))
                }
                value={userdata.gender}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="other">other</option>
              </select>
            ) : (
              <p className="text-gray-400">{userdata.gender}</p>
            )}
            <p className="font-medium">Birthday:</p>
            {isedit ? (
              <input
                className="max-w-28 bg-gray-100"
                type="date"
                value={userdata.dob}
                onChange={(e) =>
                  setuserdata((prev) => ({ ...prev, dob: e.target.value }))
                }
              />
            ) : (
              <p className="text-gray-400">{userdata.dob}</p>
            )}
          </div>
        </div>
        <div className="mt-10">
          {isedit ? (
            <button
              className="border px-8 py-2 rounded-full cursor-pointer border-blue-500 hoverprimary hover:text-white transition-all duration-300"
              onClick={updateuserprofiledata}
            >
              Save infomation
            </button>
          ) : (
            <button
              className="border px-8 py-2 rounded-full cursor-pointer border-blue-500 hoverprimary hover:text-white transition-all duration-300"
              onClick={() => setisedit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default Myprofile;
