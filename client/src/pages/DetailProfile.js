

import axios from "axios";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router"






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


                        <p >
                          type_voiture : {type_voiture}
                        </p>
                        <p >
                          poids : {poids}
                        </p>



                      </blockquote>
                      <button type="button" className="inline-block px-6 py-2 border-2 border-green-500 text-gray-400 font-medium text-xs leading-tight uppercase rounded hover:bg-green-500 hover:bg-opacity-2 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">cantacter</button>
    
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


