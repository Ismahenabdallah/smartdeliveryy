import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import React, { useEffect, useState } from "react";


import { useDispatch, useSelector } from "react-redux";

import { GetProfile } from "../redux/actions/profileActions";
var id 

const MyProfile = () => {
  const toast = useToast();




  //const {fullname, password, confirm_password, err, success} = data
  let profile = useSelector((state) => state.profiles.profile);
  const { _id, user, avatar, adress_actuel, matricule_voiture, type_voiture, poids } = profile;
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {


    await dispatch(GetProfile());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const [code, setCode] = useState('')
  


  function active  () {
    if (code === '') {
      console.log('il faut saisir un code ') ;
      
    } else { 
     
    
      
       id =  navigator.geolocation.watchPosition( function  (position ) {
        
        axios.post("/api/localisation",{
          loaded: true,
          crd: {
            lat: position.coords.latitude,
            long: position.coords.longitude,
          },
          code:code }
          )
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
        console.log("Latitude is :", position.coords.latitude)
        console.log("Longitude is :", position.coords.longitude)
       
      } )
      
      toast({
        position: "bottom-left",
        title: "votre position est mapper.",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
  
  
  }}
 
 function desactive() {
  return navigator.geolocation.clearWatch(id);
 }

  return (

    <div className=" dark:bg-[#212533] dark:text-gray-400 h-[94vh] p-2 mt-4">
      {Object.keys(profile).length === 0 ? (
        <div className="flex mt-14 ">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className=" justify-content-evenly mt-5">

          <div className=" md:ml-16 mt-14">
            <div className="d-flex">
              <i className="bi bi-person-fill  text-3xl "></i> <h2>My Profile </h2>
            </div>





            <div className="flex justify-center">
              <div className="flex flex-col md:flex-row md:max-w-3xl rounded-lg bg-[#fff] dark:bg-slate-900 shadow-lg">
                <img className=" w-full m-5 h-52 md:h-auto object-cover  rounded-t-lg md:rounded-none md:rounded-l-lg" src={avatar ? avatar : avatar} alt="" />
                <div className="p-6   flex flex-col justify-start text-lg md:text-left font-semibold dark:font-light">
                  <table className="p-2  w-[100vh] text-lg md:text-left font-semibold text-gray-600 capitalize">
                    <tr><td> nom et prénom :</td> <td className="text-gray-400 dark:text-gray-600"> {user.fullname}</td></tr>
                    <tr className="normal-case"><td> Email :</td> <td className="text-gray-400 dark:text-gray-600"> {user.email}</td></tr>

                    <tr><td>    adress_actuel :  </td> <td className="text-gray-400 dark:text-gray-600"> {adress_actuel}</td></tr>
                    <tr><td>    matricule_voiture : </td> <td className="text-gray-400 dark:text-gray-600"> {matricule_voiture}</td></tr>
                    <tr><td>    type_voiture : </td> <td className="text-gray-400 dark:text-gray-600"> {type_voiture}</td></tr>
                    <tr><td>    poids : </td> <td className="text-gray-400 dark:text-gray-200"> {poids}</td></tr>
                    <tr><td>entre votre 
                    code de rack </td> <td> <input className="shadow p-2  bg-white rounded" type='text'
                    name="code"
          
                    onChange={(e) => setCode(e.target.value)}
                    required /> </td></tr>
              
                    <tr> <td> </td> <td><button type="button" className="btn btn-outline-warning" data-mdb-ripple-color="dark" onClick={ active }>active Gps</button></td></tr>
                    <tr> <td></td> <td> <button type="button" className="btn btn-outline-warning" data-mdb-ripple-color="dark" onClick={desactive} >désactive</button></td></tr>
                  </table>











                  <div>

                  </div>

                </div>
              </div>
            </div>









          </div>


        </div>


      )}
    </div>

  )

      }
 
export default MyProfile;
