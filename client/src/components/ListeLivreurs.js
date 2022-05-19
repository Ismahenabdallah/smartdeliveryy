import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GetAllUsers } from "../redux/actions/allUsers";
import Inputs from "./Inputs";

export default function ListeLivreurs() {
    const users = useSelector(state => state.users)
    const [filter, setFilter] = useState('')
    const search = (e) => {
      setFilter(e.target.value)
  
    }
    let dataSearchLivreurs= users.users.filter((item) => {
        return Object.keys(item).some(key =>
          item[key].toString().toLowerCase().includes(filter.toString().toLowerCase()))
      })
    const dispatch = useDispatch();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {

    await dispatch(GetAllUsers());


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    return (

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

<div className=" md:flex ">
                    <div className="flex">
                      <i className="bi bi-person-fill  text-2xl "></i>
                      <h4>Listes des Livreures </h4>
                    </div>
                    <hr />

                    <div className=" md:ml-[40%] ">
                      <Inputs type="text" placeholder="Search" name="searchTerm" value={filter} onChangeHandler={search} />
                    </div>


                  </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                          fullname
                        </th>
                        <th scope="col" className="px-6 py-3">
                            email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            avatarImage
                        </th>
                        <th scope="col" className="px-6 py-3">
                            ACTION
                        </th>
                       
                    </tr>
                </thead>
                <tbody>
{dataSearchLivreurs.map(({ _id,fullname,email , role, avatarImage})=>(
    <>
    {role==="LIVREUR" ? 
  
<tr key={_id}  className="bg-[#fff] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
    
     <td className="px-6 py-4">
         {fullname}
     </td>
     <td className="px-6 py-4">
         {email}
     </td>
     <td className="px-6 py-4">
      <img src= {avatarImage} alt="" className="w-12 "/>
     </td>
     <td className="px-6 py-4">
       
     </td>

   
 </tr>
   
 : null}
    </>
))}
                   
                  
                    
                </tbody>
            </table>
        </div>

    )
}