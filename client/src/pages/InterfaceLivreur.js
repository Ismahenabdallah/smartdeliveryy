
import React, { useState } from "react";
import Inputs from "../components/Inputs";
import { useDispatch, useSelector } from 'react-redux'
import { useToast } from "@chakra-ui/toast";
import moto from '../assets/moto.png';
import truck from '../assets/camion.png';
import voiture from '../assets/voiture.png';
import { AddProfile } from "../redux/actions/profileActions";
export default function InterfaceLivreu() {
  const [form, setForm] = useState({
    _id: '', user: '', avatar: '', adress_actuel: '',
    matricule_voiture: '', type_voiture: '', poids: '',
    err: '',
    success: ''

  })

  
  const [avatar, setAvatar] = useState(false)

  const dispatch = useDispatch()

  //const profiles = useSelector(state=>state.profiles)
  const [message, setMessage] = useState("")
  const [show, setShow] = useState(false)
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const toast = useToast();
  const errors = useSelector((state) => state.errors)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  //useEffect(async ()=>{
  // await dispatch(GetProfile())
  // setForm(profiles.profile)
  //},[dispatch, profiles.profile])
  const onSubmit = (e) => {





    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    e.preventDefault();

    if ((avatar.type !== 'image/jpeg') && (avatar.type !== 'image/png')&& (avatar.type !== 'image/webp')) {
      toast({
        title: "File format is incorrect.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
        render: (props) => (
          <div className="bg-yellow-500 shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3" id="static-example" role="alert" aria-live="assertive" aria-atomic="true" data-mdb-autohide="false">
            <div className="bg-yellow-500 flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-yellow-400 rounded-t-lg">
              <p className="font-bold text-white flex items-center">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="exclamation-triangle" className="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path fill="currentColor" d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path>
                </svg>
                File format is incorrect.</p>
             
            </div>
            <div className="p-3 bg-yellow-500 rounded-b-lg break-words text-white">
              PNG ,JPEG,WEBP
            </div>
          </div>
        ),
      });
    }





    var formData = new FormData()
    formData.append('file', avatar)

    formData.append('adress_actuel', form.adress_actuel)
    formData.append('matricule_voiture', form.matricule_voiture)
    formData.append('type_voiture', form.type_voiture)
    formData.append('poids', form.poids)



    dispatch(AddProfile(formData, setShow, setMessage, config))


  }


  return (
    <div className=" p-4 mt-11 dark:bg-[#212533] dark:text-gray-400  h-full">





      <div className=" md:ml-40    ">

        <div className="flex">
          <i className="bi bi-person-fill  text-3xl " ></i> <h2>Add Profile</h2>
        </div>
        <div className="flex ">

          <div className="p-6 shadow-lg   form_profile  border-1 rounded"  >

            <form className=" w-[100vh] " method="post" onSubmit={onSubmit.bind(this)} encType='multipart/form-data'>






              {/** <img src={url} alt=""/>*/}

              <Inputs name="file" type="file" onChangeHandler={(e) => { setAvatar(e.target.files[0]) }} />

              <Inputs name="adress_actuel" placeholder="adress_actuel" type="text" errors={errors.adress_actuel} onChangeHandler={onChangeHandler} value={form && form.adress_actuel ? form.adress_actuel : ""} />
              <Inputs name="matricule_voiture" placeholder="matricule_voiture" type="text" errors={errors.matricule_voiture} onChangeHandler={onChangeHandler} value={form && form.matricule_voiture ? form.matricule_voiture : ""} />
                     <Inputs name="poids" placeholder="poids" type="text" onChangeHandler={onChangeHandler} errors={errors.poids} value={form && form.poids ? form.poids : ""} />

              <div className='flex space-x-0 space-y-0 m-0' > 
             <div className=" flex m-0">
               
             <input   type="radio" name="type_voiture" value="truck" id="type_voiture" onChange={onChangeHandler} required />
             <img  className="w-[24%]"src={truck} alt=""/>
         
        
              </div>
                <div className="flex m-0 ">
                  <input   type="radio" name="type_voiture" value="moto" id="type_voiture" onChange={onChangeHandler} required />
                 <img className="w-[24%] " src={moto} alt=""/>
         
        
                </div>
                <div className="flex ">
                  <input   type="radio" name="type_voiture" value="voiture" id="type_voiture" onChange={onChangeHandler} required />
                 <img  className="w-[24%]" src={voiture} alt=""/>
         
        
                </div>
               
              </div>



              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-primary" >
                  save
                </button>

              </div>


            </form>

          </div>



          <div className="alert alert-success ml-5 w-60 h-16 mt-28 " role="alert" style={{ display: show ? "block" : "none" }}>
            {message}
          </div>
        </div>
      </div>
    </div>
  );
}







