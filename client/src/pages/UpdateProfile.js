


import React, { useEffect, useState } from "react";
import Inputs from "../components/Inputs";
import { useDispatch, useSelector } from 'react-redux'

import moto from '../assets/moto.png';
import truck from '../assets/camion.png';
import voiture from '../assets/voiture.png';
import { AddProfile, GetProfile } from "../redux/actions/profileActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function UpdateProfile(){
    const [form, setForm] = useState({
        _id: '', user: '', avatar: '', adress_actuel: '',
        matricule_voiture: '', type_voiture: '', poids: '',
        err: '',
        success: ''
    
      })
    
      const toastOptions = {
        position: "top-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
      const [avatar, setAvatar] = useState(false)
    
      const dispatch = useDispatch()
    
     
    
    
    
      const onChangeHandler = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value
        })
      }
    
      const errors = useSelector((state) => state.errors)
     
      let profiles = useSelector((state) => state.profiles);
      
//eslint-disable-next-line react-hooks/exhaustive-deps
     useEffect(async ()=>{
     
    
       await dispatch(GetProfile())
       setForm(profiles.profile)
     
     
     // eslint-disable-next-line react-hooks/exhaustive-deps
     },[])
      
      const onSubmit = async (e) => {
    
    
    
    
    
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        e.preventDefault();
        if ((avatar.type !== 'image/jpeg') && (avatar.type !== 'image/png')&& (avatar.type !== 'image/webp')) {
     
            toast.error("image required /jpeg/webp/png", toastOptions);
          }
     
      
    
    
    
        var formData = new FormData()
        formData.append('file', avatar)
    
        formData.append('adress_actuel', form.adress_actuel)
        formData.append('matricule_voiture', form.matricule_voiture)
        formData.append('type_voiture', form.type_voiture)
        formData.append('poids', form.poids)
    
    
    
        dispatch(AddProfile(formData, config))
        
    
      }
    
    
      return (
        <div className=" p-4 mt-11 dark:bg-[#212533] dark:text-gray-400  h-full">
    
    
    
    
    
          <div className=" md:ml-40    ">
    
            <div className="flex">
              <i className="bi bi-person-fill  text-3xl " ></i> <h2>Update Profile</h2>
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
                    <button type="submit"   className="btn btn-primary" >
                      Update
                    </button>
    
                  </div>
    
    
                </form>
    
              </div>
    
    
    
            
            </div>
          </div>
          <ToastContainer  />
        </div>
      );
}