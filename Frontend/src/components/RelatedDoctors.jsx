import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/Appcontext'
import { useNavigate } from 'react-router';

const RelatedDoctors = ({docId,docspec}) => {
    const { doctors}=useContext(AppContext);
    const [reldoc,setreldoc]=useState([]);
    const nagivate=useNavigate();
    useEffect(() => {
      const RelatedDoctors=doctors.filter((doc)=>doc.speciality===docspec && doc._id!==docId)
      setreldoc(RelatedDoctors);
    }, [doctors,docId,docspec])
    
  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Related Doctors</h1>
      <p className="sm:w-1/2 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {reldoc.slice(0, 5).map((item, id) => (
          <div
            onClick={() => {nagivate(`/appointment/${item._id}`); scrollTo(0, 0);}}
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
  )
}

export default RelatedDoctors
