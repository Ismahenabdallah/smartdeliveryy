/* eslint-disable array-callback-return */



import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router"
import { FaStar } from 'react-icons/fa';
import axios from "axios";
import moto from '../assets/moto.png';
import truck from '../assets/camion.png';
import voiture from '../assets/voiture.png';


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { GetAllProfiles } from "../redux/actions/profileActions";

import { GetAllUsers } from "../redux/actions/allUsers";


export default function DetailProfile() {
  let profiles = useSelector((state) => state.profiles);
  const dispatch = useDispatch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      useEffect(async () => {

        await dispatch(GetAllUsers());
    
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
 // eslint-disable-next-line react-hooks/exhaustive-deps
 useEffect(async () => {


  await dispatch(GetAllProfiles());

  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
// eslint-disable-next-line react-hooks/exhaustive-deps

const [l, setL ]= useState([])
  const { id } = useParams();
  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const likePost =async  ()=>{
   await axios.put(`http://localhost:5000/api/like/${id}`)
    .then(result=>{
    console.log(result)
    setL(result.data)
    if(result.request.status===200){
      toast.success("bien évaluer", toastOptions);
     }
    
   if(result.data==="déja évaluer"){
    toast.error("déja évaluer", toastOptions);
   }
    }).catch(err=>{
        console.log(err)
    })
}
  




  return (
    <div className=" dark:bg-[#212533] dark:text-gray-400 h-full   p-2 mt-4">
      <div className=""  >

        {

          profiles.profiles.map(({ _id, user, avatar, adress_actuel, likes ,matricule_voiture, type_voiture, poids }) => (





            <div  key={_id}  className="">
              {id === _id ? (
                <div className="max-w-md mx-auto mt-14 bg-[#fff] dark:bg-slate-900 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                  <div className="md:grid md:grid-cols-2">
                    <div className="">
                      <img className=" w-[100%] object-cover " src={avatar} alt="" />


                    </div>
                    <div className="p-8">
                      <blockquote className="text-lg text-left  ">
                        <p className="mt-2" >
                          nom et prénom : {user.fullname}
                        </p>
                        <p >
                          email : {user.email}
                        </p>

                        <p >

                          adress_actuel : {adress_actuel}
                        </p>
                        <p >
                          matricule_voiture : {matricule_voiture}
                        </p>


                        <>
                          {
                            type_voiture === 'truck' ?
                              (
                                <p className='flex '> type_voiture :  {type_voiture} <img className="w-[10%] ml-2" src={truck} alt="" /></p>

                              ) : ""

                          }
                          {
                            type_voiture === 'moto' ?
                              (
                                <p className='flex '> type_voiture :  {type_voiture} <img className="w-[10%] ml-2  " src={moto} alt="" /></p>

                              ) : ""

                          }
                          {
                            type_voiture === 'voiture' ?
                              (
                                <p className='flex '> type_voiture :  {type_voiture} <img className="w-[10%] ml-2 " src={voiture} alt="" /></p>

                              ) : ""

                          }
                        </>
                       
                        <p >
                          poids : {poids}
                        </p>

<div className="flex">
<p> Evaluation : </p>
<i className="bi bi-hand-thumbs-up text-y cursor-pointer text-2xl"   onClick={()=>{likePost(id)}}></i>

{l.length ?
  <FaStar  size={24} className="mr-2  cursor-pointer text-yellow-400"/>
   : null                   
            
}

</div>



                      </blockquote>
                    

                    </div>
                  </div>
                </div>
              ) : ""
              }

            </div>











          ))}


      </div>
      <ToastContainer />
    </div>


  )
}


