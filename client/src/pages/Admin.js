import React, { useEffect, useState } from "react";


import ListeClient from'../components/listeClient'


import {GetAllProfiles } from "../redux/actions/profileActions";

import { GetAllUsers } from "../redux/actions/allUsers";
import ListeLivreurs from "../components/ListeLivreurs";

import { useDispatch } from "react-redux";
import ProfileLivreures from "../components/ProfileLivreures";

const Admin = () => {
 
  const [openTab, setOpenTab] = useState(1);
  
  //console.log(filter)
  
  // let dataSearchClient = users.users.filter((item) => {
  //   return Object.keys(item).some(key =>
  //     item[key].toString().toLowerCase().includes(filter.toString().toLowerCase()))
  // })


  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {


    await dispatch(GetAllProfiles());
   

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {

    await dispatch(GetAllUsers());


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" dark:bg-[#212533] dark:text-gray-400 w-full h-full p-2 mt-4">
      <div className="flex">
        <div className="w-full mt-9">
          <ul
            className="flex mb-0 list-none pt-3 pb-2 space-x-2 "
            role="tablist"
          >
            <li className="text-center ">
              <a
                className={
                  "text-xs font-bold uppercase  hover:text-gray-500 px-0 w-32 py-3 shadow-sm rounded block leading-normal " +
                  (openTab === 1
                    ? "text-white bg-y"
                    : "text-gray-800 bg-[#fff] dark:bg-gray-500 dark:text-slate-700")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                listes des clients
              </a>
            </li>
            <li className=" text-center">
              <a
                className={
                  "text-xs font-bold uppercase hover:text-gray-500 px-0 w-32 py-3 shadow-sm rounded block leading-normal " +
                  (openTab === 2
                    ? "text-white bg-y"
                    : "text-gray-800 bg-[#fff] dark:bg-gray-500 dark:text-slate-700")
                }
                
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                listes des livreures
              </a>
            </li>
            <li className=" text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-0 w-32 py-3 hover:text-gray-500 shadow-sm rounded block leading-normal " +
                  (openTab === 3
                    ? "text-white bg-y"
                    : "text-gray-800 bg-[#fff] dark:bg-gray-500 dark:text-slate-700")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                Profiles
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words  w-full mb-6 rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">



              <ListeClient/>


                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
              <ListeLivreurs/>
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">


              


              <ProfileLivreures/>







                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;