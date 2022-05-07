
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { GetProfile } from '../redux/actions/profileActions'

export default function ListeLivreur() {

  const profiles = useSelector(state => state.profiles)
  const dispatch = useDispatch()
 

useEffect(()=>{
return async  ()=>{
  await  dispatch(GetProfile())
}
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

 
 
  return (


    <div className=" dark:bg-[#212533] dark:text-gray-400 h-[150vh] p-2 mt-4">
      <div className=" justify-content-evenly mt-4">

        <div className=" md:ml-16 mt-14">
          <div className="d-flex">
            <i className="bi bi-person-fill  text-3xl "></i> <h2>Profiles list</h2>
          </div>
          <div className=" shadow-2xl p-2 mb-5 ml-0 w-[110%] md:w-[80%]    rounded" style={{ backgroundColor: "white" }} >
        


{
  profiles.profiles.map(({ _id, user, avatar,  adress_actuel, matricule_voiture, type_voiture, poids }) => (


    (

      <div key={_id} className="gird grid-cols-1 gap-y-20 md:grid md:grid-cols-2  ">
        
        
          
      <div className="col-lg-8 ml-5">
        <div className="card mb-8">
          <div className="card-body text-center">
          
                      <h5 className="my-3">{user.fullname}</h5>
            <p className="text-muted mb-1">{user.role}</p>
            <p className="text-muted mb-4">{adress_actuel}</p>
            <div className="d-flex justify-content-center mb-2">
              
              <button type="button" className="btn btn-outline-primary ms-1">update</button>
            </div>
          </div>
        </div>
        </div>
        <div className="col-lg-14 -ml-10 ">
        <div className="card mb-4">
          <div className="card-body">
            <div className="row ">
              <div className="col-sm-4 ">
                <p className="mb-0">Full Name</p>
              </div>
              <div className="col-sm-8">
                <p className="text-muted mb-0">{user.fullname}</p>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-4">
                <p className="mb-0">Email</p>
              </div>
              <div className="col-sm-8">
                <p className="text-muted mb-0">{user.email}</p>
              </div>
            </div>
            <hr/>
          
            
           
        
            
            <div className="row">
              <div className="col-sm-4">
                <p className="mb-0">Address</p>
              </div>
              <div className="col-sm-8">
                <p className="text-muted mb-0">{adress_actuel}</p>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-4">
                <p className="mb-0">Phone</p>
              </div>
              <div className="col-sm-8">
                <p className="text-muted mb-0">{matricule_voiture}</p>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-4">
                <p className="mb-0">type_voiture</p>
              </div>
              <div className="col-sm-8">
                <p className="text-muted mb-0">{type_voiture}</p>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-4">
                <p className="mb-0">poids</p>
              </div>
              <div className="col-sm-8">
                <p className="text-muted mb-0">{poids}</p>
              </div>
            </div>
            <hr/>
          </div>
          </div>
          </div>
       
        
        
</div>

         

       


    )

  ))
}

</div>


          </div>
          </div>
      
      </div>
     

      )
}

   