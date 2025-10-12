import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AppContext } from "../context/Appcontext";
import { useNavigate } from 'react-router'
const Doctors = () => {
  const { specialization } = useParams();
  const { doctors } = useContext(AppContext);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [showfilter, setShowFilter] = useState(false);
  const filterDoctorsBySpecialization =async () => {
    if(specialization){
      setFilteredDoctors(doctors.filter((doc)=> doc.speciality=== specialization))
    }
    else{
      setFilteredDoctors(doctors)
    }
  }
  useEffect(() => {
    filterDoctorsBySpecialization();
  }, [specialization,doctors])
  
  const nagivate=useNavigate();
  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5 ">
        <button onClick={()=>setShowFilter(!showfilter)} className={`py-1 px-3 border border-gray-300 rounded text-sm transition-all sm:hidden ${showfilter?'primary text-white':''}`}>Filter</button>
        <div className={`${showfilter?'flex':'hidden sm:flex'}  flex-col gap-4 text-sm text-gray-600`}>
          <p onClick={()=> specialization==='General physician' ?  nagivate('/doctors'): nagivate('/doctors/General%20physician') } className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${specialization==='General physician'?"bg-indigo-100 text-black" :""}`}>General physician</p>
          <p onClick={()=> specialization==='Gynecologist'?  nagivate('/doctors') : nagivate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${specialization==='Gynecologist'?"bg-indigo-100 text-black" :""}`}>Gynecologist</p>
          <p onClick={()=> specialization==='Dermatologist'?  nagivate('/doctors') : nagivate('/doctors/Dermatologist') } className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${specialization==='Dermatologist'?"bg-indigo-100 text-black" :""}`}>Dermatologist</p>
          <p onClick={()=> specialization==='Pediatricians'?  nagivate('/doctors') : nagivate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${specialization==='Pediatricians'?"bg-indigo-100 text-black" :""}`}>Pediatricians</p>
          <p onClick={()=> specialization==='Neurologist'?  nagivate('/doctors'): nagivate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${specialization==='Neurologist'?"bg-indigo-100 text-black" :""}`}>Neurologist</p>
          <p onClick={()=> specialization==='Gastroenterologist'?  nagivate('/doctors'): nagivate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${specialization==='Gastroenterologist'?"bg-indigo-100 text-black" :""}`}>Gastroenterologist</p>
        </div>
        <div className="w-full grid auto gap-4 gap-y-6">
          {filteredDoctors.map((item, id) => (
            <div
              onClick={() => nagivate(`/appointment/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              key={{ id }}
            >
              <img className="bg-blue-50" src={item.image} alt="item.image" />
              <div className="p-4">
                <div className={`flex items-center gap-2 text-sm text-center ${item.available?'text-green-500':'text-gray-900'} `}>
                  <p  className={`w-2 h-2 ${item.available?'bg-green-500':'bg-gray-500'}  rounded-full`}></p>
                  <p>{item.available?'Available':'Not Available'}</p>
                </div>
              </div>
              <div className="pl-3 py-2.5">
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
