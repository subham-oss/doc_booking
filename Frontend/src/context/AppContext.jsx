import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
export const AppContext = createContext();
const AppProvider = (props) => {
  const currencySymbol = "$";
  const [doctors, setdoctors] = useState([]);
  const [userdata,setuserdata]=useState(false);
  const [token,settoken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
  const backendurl = import.meta.env.VITE_BACKEND_URI;
  
  const getallitems = async () => {
    try {
      
      const { data } = await axios.get(backendurl + '/api/admin/list');
      if (data.success) {
        setdoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const getUserData= async ()=>{
    try {
      const {data}= await axios.get(backendurl + '/api/user/get-profile',{headers:{token}})
      if(data.success){
        setuserdata(data.user)
      }else{
        toast.error(data.message);
      }
    } catch (error) {
        console.log(error);
      toast.error(error.message);
    }
  }
  useEffect(() => {
    getallitems()
  },[]);
  useEffect(() => {
    if(token){
      getUserData()
    }else{
      setuserdata(false)
    }
  },[token])
  const value = {
    doctors,getallitems,
    currencySymbol,
    token,settoken,backendurl,userdata,setuserdata,getUserData
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
export default AppProvider;
