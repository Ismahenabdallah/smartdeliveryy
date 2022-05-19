import { useDispatch, useSelector } from "react-redux";
import Inputs from "../components/Inputs";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { DeleteProfile, GetAllProfiles } from "../redux/actions/profileActions";
export default function ProfileLivreures(){
    const dispatch = useDispatch();
    let profiles = useSelector((state) => state.profiles);
  const [filter, setFilter] = useState('')
  const search = (e) => {
    setFilter(e.target.value)

  }
    let dataSearch = profiles.profiles.filter((item) => {
        return Object.keys(item).some(key =>
          item[key].toString().toLowerCase().includes(filter.toString().toLowerCase()))
      })
       // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {


    await dispatch(GetAllProfiles());
   

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const DeleteHandler = (id) => {
    dispatch(DeleteProfile(id))
  }
    return (
        <div className="">
        <div className=" md:flex ">
          <div className="flex">
            <i className="bi bi-person-fill  text-2xl "></i>
            <h4>Listes  des Profiles  </h4>
            </div>
            <hr/>
            
          <div className=" md:ml-[40%] ">
            <Inputs type="text" placeholder="Search" name="searchTerm" value={filter} onChangeHandler={search} />
          </div>


        </div>
     

                <div className=" md:grid md:grid-cols-3  space-x-3 mr-20 "  >

{

  dataSearch.map(({ _id, user, avatar, adress_actuel, matricule_voiture, type_voiture, poids, likes }) => (





    <div key={_id} className="">
      <figure className=" w-full  text-left m-3 dark:bg-slate-900 bg-[#fff] rounded-xl p-8 shadow-2xl ">
        <img className="w-24 h-24 md:w-32 md:h-auto md:rounded-lg rounded-full mx-auto" src={avatar} alt="" />
        <div className="pt-4 md:p-4 text-center md:text-left space-y-1 text-gray-300">



          <blockquote className="text-lg md:text-left  font-light">
            <p >
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

            <p className="p-1 " >
              action :
              <button className="btn  ml-4 btn-outline-danger" onClick={() => DeleteHandler(_id)}>Delete Profile</button>

            </p>

            <div className="flex"> Evaluation : {likes.map((_, index) => {
              return (<FaStar key={index} size={24} className="mr-2 cursor-pointer text-yellow-400" />)

            })

            }
            </div>

          </blockquote>


        </div>
      </figure>
    </div>











  ))}


</div>


      </div>   
    )
}