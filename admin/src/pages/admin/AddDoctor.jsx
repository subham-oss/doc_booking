import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";

const AddDoctor = () => {
  const [image,setimage]=useState(false)
  const [name,setname]=useState('')
  const [email,setemail]=useState('')
  const [Password,setPassword]=useState('')
  const [Experience,setExperience]=useState('1 Year')
  const [Fees,setFees]=useState('')
  const [Speciality,setSpeciality]=useState('General physician')
  const [Education,setEducation]=useState('')
  const [Address1,setAddress1]=useState('')
  const [Address2,setAddress2]=useState('')
  const [About,setAbout]=useState('')
  const [disabled,setdisabled]=useState(false)
  const {Backenduri,atoken}=useContext(AdminContext)
  const onsubmithandler = async(e)=>{
    e.preventDefault();
    setdisabled(true)
    if(!image){
      toast.error("Please Upload Image")
    }
    try {
       const formdata = new FormData();
       formdata.append('name',name)
       formdata.append('email',email)
       formdata.append('password',Password)
       formdata.append('experience',Experience)
       formdata.append('fees',Number(Fees))
       formdata.append('speciality',Speciality)
       formdata.append('degree',Education)
       formdata.append('address',JSON.stringify({line1:Address1,line2:Address2}))
       formdata.append('about',About)
       formdata.append('image',image)
       const {data}=await axios.post(Backenduri + '/api/doctor/add-doctor',formdata,{headers:{atoken:atoken}})
      if (data.success){
        toast.success("Doctor Added Successfully")
        setimage(false)
        setname('')
        setemail('')
        setPassword('')
        setExperience('')
        setFees('')
        setEducation('')
        setAddress1('')
        setAddress2('')
        setAbout('')
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error);
      
    }
    setdisabled(false)
  }
  return (
    <form onSubmit={onsubmithandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white px-8 py-8 border border-gray-200 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc_img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={image? URL.createObjectURL(image)  :assets.upload_area}
              alt="upload area"
            />
          </label>
          <input onChange={(e)=>setimage(e.target.files[0])} type="file" id="doc_img" hidden />
          <p>
            Upload doctor <br /> picture
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor name</p>
              <input onChange={(e)=>setname(e.target.value)} value={name} className="border border-gray-300 rounded px-3 py-2" type="text" placeholder="Name" required />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor email</p>
              <input onChange={(e)=>setemail(e.target.value)} value={email} className="border border-gray-300 rounded px-3 py-2" type="text" placeholder="Email" required />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password</p>
              <input onChange={(e)=>setPassword(e.target.value)} value={Password}  className="border border-gray-300 rounded px-3 py-2" type="Password" placeholder="Password" required />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select onChange={(e)=>setExperience(e.target.value)} value={Experience}  className="border border-gray-300 rounded px-3 py-2" name="" id="id1">
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input onChange={(e)=>setFees(e.target.value)} value={Fees}  className="border border-gray-300 rounded px-3 py-2" type="number" placeholder="Fees" required />
            </div>
          </div>
          <div  className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select onChange={(e)=>setSpeciality(e.target.value)} value={Speciality}  className="border border-gray-300 rounded px-3 py-2" name="" id="">
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input onChange={(e)=>setEducation(e.target.value)} value={Education}  className="border border-gray-300 rounded px-3 py-2" type="text" placeholder="Education" required />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input onChange={(e)=>setAddress1(e.target.value)} value={Address1}  className="border border-gray-300 rounded px-3 py-2" type="text" placeholder="Address 1" required />
              <input onChange={(e)=>setAddress2(e.target.value)} value={Address2}  className="border border-gray-300 rounded px-3 py-2" type="text" placeholder="Address 2" required />
            </div>
          </div>
        </div>
        <div>
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea onChange={(e)=>setAbout(e.target.value)} value={About}  className="border border-gray-300 rounded w-full px-4 pt-2" placeholder="write about doctor" rows={5} required />
        </div>
        <button disabled={disabled} type="submit"  className="primary px-10 py-3 text-white rounded-full cursor-pointer">Add doctor</button>
      </div>
    </form>
  );
};

export default AddDoctor;
