import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import React, { useEffect, useState } from "react";
import moto from '../assets/moto.png';
import truck from '../assets/camion.png';
import voiture from '../assets/voiture.png';
import succes from '../assets/succes.png'
import danger from '../assets/false.png'
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



  function active() {
    if (code === '') {
      console.log('il faut saisir un code ');
      toast({
        title: "il faut saisir un code.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
        render: (props) => (
          <div className="bg-red-500 shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3" id="static-example" role="alert" aria-live="assertive" aria-atomic="true" data-mdb-autohide="false">
            <div className="bg-red-500 flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-red-400 ">
              <p className="font-bold text-white flex items-center">
              <img className="w-4" src={danger} alt=""/>
                il faut saisir un code.</p>
             
            </div>
           
          </div>
        ),
      });
    } else {



      id = navigator.geolocation.watchPosition(function (position) {

        axios.post("/api/localisation", {
          loaded: true,
          crd: {
            lat: position.coords.latitude,
            long: position.coords.longitude,
          },
          code: code
        }
        )
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
        console.log("Latitude is :", position.coords.latitude)
        console.log("Longitude is :", position.coords.longitude)

      })

if(true){
  toast({
    title: "votre position est mapper.",
    status: "success",
    duration: 3000,
    isClosable: true,
    position: "top-right",
    render: (props) => (
      <div className="bg-green-500 shadow-lg mx-auto mt-20 mr-5 w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3" id="static-example" role="alert" aria-live="assertive" aria-atomic="true" data-mdb-autohide="false">
        <div className="bg-green-500 flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-green-400 rounded-lg">
          <p className="font-bold text-white flex items-center">
           <img className="w-4" src={succes} alt=""/>
            votre position est mapper...</p>
         
        </div>

      </div>
    ),
  });
}



     
      


    }
  }

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
                <img className=" w-[50vh] m-5  h-auto object-cover   md:rounded-none " src={avatar ? avatar : avatar} alt="" />
                <div className="p-6   flex flex-col justify-start text-lg md:text-left font-semibold dark:font-light">
                  <table key={_id} className="p-2  w-[100vh] text-lg md:text-left font-semibold text-gray-600 capitalize">
                    <tr><td> nom et prénom :</td> <td className="text-gray-400 dark:text-gray-600"> {user.fullname}</td></tr>
                    <tr className="normal-case"><td> Email :</td> <td className="text-gray-400 dark:text-gray-600"> {user.email}</td></tr>

                    <tr><td>    adress_actuel :  </td> <td className="text-gray-400 dark:text-gray-600"> {adress_actuel}</td></tr>
                   
             
                    <tr><td>    matricule_voiture : </td> <td className="text-gray-400 dark:text-gray-600"> {matricule_voiture}</td></tr>
                     {
                      type_voiture === 'truck' ?
                        (
                          <tr className=" "><td>    type_voiture : </td> <td className="   text-gray-400 dark:text-gray-600">  <img className="w-[14%]" src={truck} alt="" /></td></tr>

                        ) : ""

                    }
                      {
                        type_voiture === 'moto' ?
                          (
                            <tr className=" "><td>    type_voiture : </td> <td className="  text-gray-400 dark:text-gray-600">  <img className="w-[14%]" src={moto} alt="" /></td></tr>

                          ) : ""

                      }
                      {
                        type_voiture === 'voiture' ?
                          (
                            <tr className=" "><td>    type_voiture : </td> <td className="  text-gray-400 dark:text-gray-600">  <img className="w-[14%]" src={voiture} alt="" /></td></tr>

                          ) : ""

                      }

                    
                    <tr><td>    poids : </td> <td className="text-gray-400 dark:text-gray-200"> {poids}</td></tr>
                    <tr><td>entre votre  code de rack </td> <td>
                      <input
                        type="text"
                        className="
       
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-gray-100 bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
                        name="code"
                        id="code"
                        onChange={(e) => setCode(e.target.value)}
                        required
                        placeholder="Enter your code Please "
                        aria-label="code "
                        
                      />
                    </td></tr>

                    <tr className=""> <td> </td>
                      <td className="space-x-4 ">
                      <button type="button" className="btn btn-outline-warning mt-4"  onClick={active}>active Gps</button>
                        <button type="button" className="btn btn-outline-warning mt-4"  onClick={desactive} >désactive</button></td> </tr>

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
