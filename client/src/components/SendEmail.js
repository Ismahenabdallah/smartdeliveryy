
import { useEffect, useState } from "react"
import { NavLink, useParams } from 'react-router-dom';

import succ from '../assets/succ.jpeg'

import axios from "axios";
export default function SendEmail() {
    
   
        const [validUrl, setValidUrl] = useState(false)
        const param = useParams()
        useEffect(() => {
            const verifUrl = async () => {
                try {
                    axios.get(`http://localhost:5000/api/confirm/${param.confirmationCode}`);

                    setValidUrl(true)
                    console.log(param)
                }
                catch (err) {
                    console.log(err)
                    setValidUrl(false)
                }
            }
            verifUrl()
        },[param])

    

    return (

        <div className=" dark:bg-[#212533] h-[100vh] dark:text-gray-400 ">
            {validUrl ? (
                  <div className='container-fluid   '>

                  <div className=' container mt-12 overflow-x-hidden  items-center  ' >
  
                      <div className=' block md:ml-[50vh]  mt-20 ' >
                    <img src={succ} alt="" className="h-20 mt-10 w-20" />
                    <h1>Email Verification </h1>
                    <NavLink to="/login">
                        <button className="btn btn-success">login</button>
                    </NavLink>
                    </div>
                   
                </div>
                </div>
            ) :
                (
                    <h1>not found 404</h1>
               )}
        </div>


    )


}



