import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";
const Login = () => {
  const [state, setstate] = useState("Admin");
  const { setatoken, Backenduri } = useContext(AdminContext);
  const{setDtoken}=useContext(DoctorContext)
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const onsubmithandle = async (e) => {
    e.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(Backenduri + "/api/doctor/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("atoken", data.token);
          setatoken(data.token);
        }
        else{
          toast.error(data.message)
        }
      }else{
        const {data} = await axios.post(Backenduri + "/api/admin/login",{email,password})
        if(data.success){
          localStorage.setItem("dtoken",data.token)
          setDtoken(data.token)
        }
        else{
          toast.error(data.message)
        }
      }
    } catch (error) {
      
    }
  };
  return (
    <form onSubmit={onsubmithandle} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border-b-gray-500 rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="textprimary">{state}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setemail(e.target.value)}
            value={email}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setpassword(e.target.value)}
            value={password}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>
        <button className="primary cursor-pointer text-white w-full py-2 rounded-md text-base">
          Login
        </button>
        {state === "Admin" ? (
          <p>
            Doctor Login?{" "}
            <span
              className="textprimary underline cursor-pointer"
              onClick={() => setstate("Doctor")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span
              className="textprimary underline cursor-pointer"
              onClick={() => setstate("Admin")}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
