import React, { useEffect } from "react";


import { useDispatch, useSelector } from "react-redux";

import { GetProfile } from "../redux/actions/profileActions";

const MyProfile = () => {




  //const {fullname, password, confirm_password, err, success} = data
  let profile = useSelector((state) => state.profiles.profile);
  const { _id, user, avatar, adress_actuel, matricule_voiture, type_voiture, poids } = profile;
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {


    await dispatch(GetProfile());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (

    <div className=" dark:bg-[#212533] dark:text-gray-400 h-[94vh] p-2 mt-4">
      {Object.keys(profile).length === 0 ? (
        <div className="flex mt-14 ">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className=" justify-content-evenly mt-4">

          <div className=" md:ml-16 mt-14">
            <div className="d-flex">
              <i className="bi bi-person-fill  text-3xl "></i> <h2>My Profile </h2>
            </div>





            <div class="flex justify-center">
              <div class="flex flex-col md:flex-row md:max-w-3xl rounded-lg bg-[#fff] dark:bg-slate-900 shadow-lg">
                <img class=" w-full m-5 h-52 md:h-auto object-cover  rounded-t-lg md:rounded-none md:rounded-l-lg" src={avatar ? avatar : avatar} alt="" />
                <div class="p-6   flex flex-col justify-start text-lg md:text-left font-semibold dark:font-light">
                  <table className="p-2  w-[100vh] text-lg md:text-left font-semibold text-gray-600 capitalize">
                    <tr><td> nom et prénom :</td> <td className="text-gray-400 dark:text-gray-600"> {user.fullname}</td></tr>
                    <tr className="normal-case"><td> Email :</td> <td className="text-gray-400 dark:text-gray-600"> {user.email}</td></tr>

                    <tr><td>    adress_actuel :  </td> <td className="text-gray-400 dark:text-gray-600"> {adress_actuel}</td></tr>
                    <tr><td>    matricule_voiture : </td> <td className="text-gray-400 dark:text-gray-600"> {matricule_voiture}</td></tr>
                    <tr><td>    type_voiture : </td> <td className="text-gray-400 dark:text-gray-600"> {type_voiture}</td></tr>
                    <tr><td>    poids : </td> <td className="text-gray-400 dark:text-gray-600"> {poids}</td></tr>
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
