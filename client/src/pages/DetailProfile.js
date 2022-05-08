

import axios from "axios";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router"


import moto from '../assets/moto.png';
import truck from '../assets/camion.png';
import voiture from '../assets/voiture.png';



export default function DetailProfile() {
  let profiles = useSelector((state) => state.profiles);
  // const { _id, user, avatar, adress_actuel, matricule_voiture, type_voiture, poids } = profile;
  const dispatch = useDispatch()
  const [data, setData] = useState({})



  const { id } = useParams();


  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const res = await axios.get(`http://localhost:5000/api/${id}`)
  //       return ({ ...data, err: "", success: res.data.msg })
  //     }
  //     catch (err) {
  //       err.response.data.msg && setData({ ...data, err: err.response.data.msg, success: '' })
  //     }
  //   }
  //   fetchData();
  // }, [data,id]);
  return (
    <div className=" dark:bg-[#212533] dark:text-gray-400 h-full md:h-[95vh]  p-2 mt-4">
      <div className=""  >

        {

          profiles.profiles.map(({ _id, user, avatar, adress_actuel, matricule_voiture, type_voiture, poids }) => (





            <div className="">
              {id === _id ? (
                <div class="max-w-md mx-auto mt-14 bg-[#fff] rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                  <div class="md:grid md:grid-cols-2">
                    <div class="">
                      <img class=" w-[100%] object-cover " src={avatar} alt="" />


                    </div>
                    <div class="p-8">
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
                                <p className='flex '> type_voiture :  {type_voiture} <img className="w-[14%]" src={truck} alt="" /></p>

                              ) : ""

                          }
                           {
                            type_voiture === 'moto' ?
                              (
                                <p className='flex '> type_voiture :  {type_voiture} <img className="w-[14%]" src={moto} alt="" /></p>

                              ) : ""

                          }
                           {
                            type_voiture === 'voiture' ?
                              (
                                <p className='flex '> type_voiture :  {type_voiture} <img className="w-[14%]" src={voiture} alt="" /></p>

                              ) : ""

                          }
                        </>
                        
                        <p >
                          poids : {poids}
                        </p>



                      </blockquote>
                    
                                    </div>
                  </div>
                </div>
              ) : ""
              }

            </div>











          ))}


      </div>

    </div>


  )
}


