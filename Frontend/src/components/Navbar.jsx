import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assetspic } from "../assets/assets_frontend/assets";
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext";
const Navbar = () => {
  const navigate = useNavigate();
  const {token,settoken,userdata}= useContext(AppContext)
  const [showmenu, setshowmenu] = useState(false);
  const logout = ()=>{
    settoken(false)
    localStorage.removeItem('token')
  }
  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-400">
      <img onClick={()=>navigate('/')} className="w-44 cursor-pointer" src={assetspic.logo} alt="logo" />
        <ul className="hidden md:flex items-start gap-5 font-medium">
          <NavLink to={'/'}>
            <li className="py-1">HOME</li>
            <hr className="border-none outline-none h-0.5 primary w-3/5 m-auto hidden" />
          </NavLink>
          <NavLink to={'/doctors'}>
            <li className="py-1">ALL DOCTORS</li>
            <hr className="border-none outline-none h-0.5 primary w-3/5 m-auto hidden" />
          </NavLink>
          <NavLink to={'/about'}>
            <li className="py-1">ABOUT</li>
            <hr className="border-none outline-none h-0.5 primary w-3/5 m-auto hidden" />
          </NavLink>
          <NavLink to={'/contact'}>
            <li className="py-1">CONTACT</li>
            <hr className="border-none outline-none h-0.5 primary w-3/5 m-auto hidden" />
          </NavLink>
        </ul>
      
      <div className="flex items-center  gap-4">
        {
          token && userdata ?
            <div className="flex items-center cursor-pointer gap-2 group relative">
              <img className="w-8 rounded-full" src={userdata.image} alt="profile pic" />
              <img className="w-2.5" src={assetspic.dropdown_icon} alt="dropdown" />
              <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                  <p onClick={()=>navigate('my-profile')} className="hover:text-black ">My profile</p>
                  <p onClick={()=>navigate('my-appointments')} className="hover:text-black ">My appointments</p>
                  <p onClick={logout} className="hover:text-black ">Logout</p>
                </div>
              </div>
            </div>
            :<button onClick={()=>navigate('login')} className=" cursor-pointer primary text-white px-8 py-3 rounded-full hidden md:block">Creat account</button>
        }
        <img onClick={()=>setshowmenu(true)} className="w-6 md:hidden" src={assetspic.menu_icon} alt="menuicon" />
        <div className={`${showmenu?'fixed w-full':'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assetspic.logo} alt="logo" />
            <img className="w-7" onClick={()=>setshowmenu(false)} src={assetspic.cross_icon} alt="crossicon" />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink  onClick={()=>setshowmenu(false)} to={'/'}>
            <p className="px-4 py-2 rounded-full inline-block">HOME
              </p>
           
          </NavLink>
          <NavLink  onClick={()=>setshowmenu(false)} to={'/doctors'}>
            <p className="px-4 py-2 rounded-full inline-block">ALL DOCTORS</p>
          </NavLink>
          <NavLink  onClick={()=>setshowmenu(false)} to={'/about'}>
            <p className="px-4 py-2 rounded-full inline-block">ABOUT</p>
           
          </NavLink>
          <NavLink  onClick={()=>setshowmenu(false)} to={'/contact'}>
            <p className="px-4 py-2 rounded-full inline-block">CONTACT</p>
            
          </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
