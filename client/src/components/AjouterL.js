import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Inputs from '../components/Inputs'
import {  RegisterL} from '../redux/actions/authActions'

function AjouterL() {
  const [form, setForm] = useState({})
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch()
  const errors = useSelector(state=>state.errors)

  const onChangeHandler = (e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e)=>{
  e.preventDefault();
  dispatch(RegisterL(form,setMessage,setSuccessful))
  }
  
  return (
    
      
    <div className='container-fluid dark:text-gray-400 dark:bg-[#212533] h-[90vh] mt-10  '>



    <div className=' container overflow-x-hidden  items-center    mr-30  gap-x-14  flex  ' >

      <div className=' container mt-8 overflow-x-hidden  items-center  ' >


        <div className=' flex md:ml-[50vh]   ' >
          <form className=' mr-10 border-1 form_login_register grid grid-cols-1 p-4 dark:bg-[#212533] bg-[#fff]  space-y-2  rounded-2xl text-start border-gray-600 border-1 z-[50]  ' onSubmit={onSubmit}>

          {!successful && (
<>


            <Inputs name="fullname" placeholder="Fullname" type="text" icon="bi bi-person-fill" onChangeHandler={onChangeHandler} errors={errors.fullname} />
            <Inputs name="email" placeholder="Email" label="Email" type="text" icon="bi bi-envelope" onChangeHandler={onChangeHandler} errors={errors.email} />
            <Inputs name="password" placeholder="Password" label="Password" type="password" icon="bi bi-key" onChangeHandler={onChangeHandler} errors={errors.password} />
            <Inputs name="confirm" placeholder="Confirm Password" type="password" icon="bi bi-key" onChangeHandler={onChangeHandler} errors={errors.confirm} />

          


            <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-outline-warning  text-gray-400 ">
                register
              </button>
            </div>


</>
            )}

            {message && (
              <div className="form-group">
                <div
                  className={
                    successful ? "alert alert-success" : "alert alert-danger"
                  }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
          </form>
         
        </div>

      </div>



    </div>

  </div>
   
  )
}

export default AjouterL