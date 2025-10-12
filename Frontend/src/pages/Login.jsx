import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
const Login = () => {
  const [state, setstate] = useState("Sign up");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const {token, settoken, backendurl } = useContext(AppContext);
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      if (state === "Sign up") {
        const { data } = await axios.post(backendurl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          settoken(data.token);
          setname("")
          setpassword("")
          setemail("")
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendurl + "/api/user/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          settoken(data.token);
          setname("")
          setpassword("")
          setemail("")
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if(token){
      navigate('/')
    }
  },[token])
  return (
    <form onSubmit={handlesubmit} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-neutral-300 rounded-xl text-zinc-600 text-sm shadow-lg ">
        <p className="text-2xl font-semibold">
          {state === "Sign up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign up" ? "sign up" : "log in"} to book
          appointment Full Name
        </p>
        {state === "Sign up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setname(e.target.value)}
              value={name}
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setemail(e.target.value)}
            value={email}
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setpassword(e.target.value)}
            value={password}
          />
        </div>
        <button type="submit" className="primary text-white w-full py-2 rounded-md text-base cursor-pointer">
          {state === "Sign up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setstate("Login")}
              className="textprimary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create an new account?{" "}
            <span
              onClick={() => setstate("Sign up")}
              className="textprimary underline cursor-pointer"
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
