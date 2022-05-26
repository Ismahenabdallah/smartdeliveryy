/* eslint-disable array-callback-return */

import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import Inputs from "../components/Inputs";

import { GetAllProfiles } from "../redux/actions/profileActions";
import { GetAllUsers } from "../redux/actions/allUsers";

const Search = () => {



    

    let profiles = useSelector((state) => state.profiles);
  
    const dispatch = useDispatch();
    const [filter, setFilter] = useState('')
    const search = (e) => {
        setFilter(e.target.value)

    }
    //console.log(filter)
    let dataSearch = profiles.profiles.filter((item) => {
        return Object.keys(item).some(key =>
            item[key].toString().toLowerCase().includes(filter.toString().toLowerCase()))
    })

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

        <div className=" dark:bg-[#212533] dark:text-gray-400 p-2 mt-14 h-full  ">

            <div className=" justify-content-evenly md:ml-14  ">


                <div className=" md:flex mt-4 mb-4">
                    <div className="flex ">
                        <i className="bi bi-person-fill  text-3xl "></i>
                        <h2 className="w-full">Listes des Livreur </h2>
                        
                       
                        
                        </div>
                    <div className=" md:ml-[30%] ">
                        <Inputs type="text" placeholder="Search" name="searchTerm" value={filter} onChangeHandler={search} />
                    </div>


                </div>

                <div className="grid grid-cols-1  md:grid md:grid-cols-3    "  >

                    {

                        dataSearch.map(({ _id, user, avatar, adress_actuel, likes  ,type_voiture }) => (







                            <div key={_id} className="card   p-2 dark:bg-slate-900 w-[60vh]  text-center form_client border-1 space-y-4    shadow-2xl ">

                                
                                    <div className="rounded overflow-hidden space-y-4    shadow-lg">
                                       
                                      <div className="  md:space-x-0">
                                      <img className=" w-[30%] ml-24 " src={avatar} alt="" /> 
                                     <div className="flex evaluer"> 
                                     Evaluation : {likes.map((_,index)=>{
 return (
 <FaStar key={index} size={24} className="mr-2  cursor-pointer text-yellow-400"/>)
                             
                                        })

                                        }
                                        </div>
                                      </div>
                                        <div className="">
                                            <div className="font-bold text-xl text-gray-600 ml-2 mb-2 ">{user.fullname}   </div>
                                            
                                           <Link  to={`/chat/${user._id}`} type="button" className="inline-block px-6 py-2 ml-2 border-2 border-yellow-500 text-gray-400 font-medium text-xs leading-tight uppercase rounded  hover:text-gray-800 hover:bg-yellow-500 hover:bg-opacity-2 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">cantacter</Link>
    
                                        </div>
                                        <div className="">
                                            <span className="inline-block bg-gray-200 rounded-full px-2   text-sm font-semibold text-gray-700 mr-2 mb-2">adress_actuel :{adress_actuel}</span>
                                            <span className="inline-block bg-gray-200 rounded-full px-2  text-sm font-semibold text-gray-700 mr-2 mb-2">type_voiture :{type_voiture}</span>
                                            <button className="btn btn-warning ">
                                            <Link to={`/${_id}`}  className="no-underline  text-gray-700 hover:text-gray-700 "> plus des informations </Link>
                                            </button> 
                                        </div>

                                    </div>
                                
                            </div>














                        ))}


                </div>


            </div>

        </div>


    )

}




export default Search;
