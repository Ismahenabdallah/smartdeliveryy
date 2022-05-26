import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUsers } from "../redux/actions/allUsers";
import { AiFillCheckCircle } from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";
import Inputs from "./Inputs";
import { useNavigate } from "react-router";
import { DeleteUser } from "../redux/actions/authActions";

export default function ListeLivreurs() {
  const users = useSelector(state => state.users)
  const [filter, setFilter] = useState('')
  const search = (e) => {
    setFilter(e.target.value)

  }
  const Navigate = useNavigate();
  let dataSearchLivreur = users.users.filter((item) => {
    return Object.keys(item).some(key =>
      item[key].toString().toLowerCase().includes(filter.toString().toLowerCase()))
  })
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {

    await dispatch(GetAllUsers());


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const DeleteHandler = (id) => {
    dispatch(DeleteUser(id))
  }
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
      <div className="">
        <button className=" btn btn-secondary" onClick={() => Navigate("/ajouterl")} > Ajouter un livreur </button>
      </div>
      <table className="w-[200vh] text-sm text-left text-gray-500 dark:text-gray-400">
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
              Verification Email
            </th>
            <th scope="col" className="px-6 py-3">
              With_Admin
            </th>

            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {dataSearchLivreur.map(({ _id, fullname, email, role, avatarImage, isAvatarImageSet, isAdmin, status }) => (
            < >
              {role === "LIVREUR" ?
                <tr key={_id} className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300 bg-gray-200 dark:hover:bg-gray-600">

                  <td className="px-6 py-4">
                    {fullname}
                  </td>
                  <td className="px-6 py-4">
                    {email}
                  </td>
                  {isAvatarImageSet === true ?
                    <td className="px-6 py-4">
                      <img src={avatarImage} alt="" className="w-12 " />
                    </td>
                    :
                    <td className="px-6 py-4  ">
                      <AiFillCloseCircle size={24} className="text-red-500 text-center " />
                    </td>}


                  {status === "Active" ?
                    <td className="px-6 py-4  mt-2">
                      <AiFillCheckCircle size={24} className="text-green-500" />
                    </td>
                    : <td className="px-6 py-4 mt-2">
                      <AiFillCloseCircle size={24} className="text-red-500 " />
                    </td>}
                  {isAdmin === true ?
                    <td className="px-6 py-4  mt-2  text-center">
                      <AiFillCheckCircle size={24} className="text-green-500" />
                    </td>
                    : <td className="px-6 py-4  mt-2">
                      <AiFillCloseCircle size={24} className="text-red-500" />
                    </td>}

                  {isAdmin === true ?
                    <td className="px-6 py-4  mt-2  text-center">
                      <button className="btn  btn-outline-danger" onClick={() => DeleteHandler(_id)}>Delete</button>

                    </td>
                    : <td className="px-6 py-4  mt-2">
                      <AiFillCloseCircle size={24} className="text-red-500" />
                    </td>}


                </tr>
                : null}
            </>
          ))}



        </tbody>
      </table>
    </div>

  )
}