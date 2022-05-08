/* eslint-disable array-callback-return */



import { useSelector } from "react-redux";

import { useParams } from "react-router"
import { FaStar } from 'react-icons/fa'

import moto from '../assets/moto.png';
import truck from '../assets/camion.png';
import voiture from '../assets/voiture.png';
import { useState } from "react";



export default function DetailProfile() {
  let profiles = useSelector((state) => state.profiles);
  // const { _id, user, avatar, adress_actuel, matricule_voiture, type_voiture, poids } = profile;
  const [likes, setlikes] = useState(0);
  const starts = Array(5).fill(0)

  const colors = {
    orange: "#ffba5a",
    gray: "#a9a9a9"
  }

  const [h, setH] = useState(undefined)
  const handleClick = value => {
    setlikes(value)
  }
  const handleMouseOver = value => {
    setH(value)
  }
  const handleMouseleave = () => {

    setH(undefined)
  }
  const { id } = useParams();

  //const [data, setData] = useState({})
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





            <div key={_id} className="">
              {id === _id ? (
                <div className="max-w-md mx-auto mt-14 bg-[#fff] rounded-xl shadow-md overflow-hidden md:max-w-2xl">
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
                      <div className="">
                      <div className="flex">
                          {starts.map((_, index) => {
                            return (<FaStar key={index} size={24} className="mr-7 cursor-pointer"
                             
                              color={(h || likes > index ? colors.orange : colors.gray)}


                              onClick={() => { handleClick(index + 1) }}
                              //*onMouseOver={() => handleMouseOver(index + 1)}
                              //onMouseLeave={handleMouseleave}*/
                            />)
                           
                          }
                         
                          )

                         
                          }


                        
                          
                           
                          
                        
                        


                        </div>

                        <p> {likes}likes </p>


                       
                      </div>

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


