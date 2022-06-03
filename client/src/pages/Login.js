import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap'
import { useNavigate } from 'react-router';
import { useState } from 'react';
import '../App.scss';






import { useDispatch, useSelector } from 'react-redux'

import Inputs from '../components/Inputs'
import { LoginAction } from "../redux/actions/authActions";
import { Link } from 'react-router-dom';

export default function Login() {
  

 

  const [form, setForm] = useState({})
  const dispatch = useDispatch()
  const errors = useSelector(state => state.errors)
  const navigate = useNavigate()

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(LoginAction(form))
  
  

  }


  return (
    <div className='container-fluid dark:text-gray-400 dark:bg-[#212533] h-[89vh]    '>



      <div className=' container mt-12 overflow-x-hidden  items-center  ' >


        <div className=' flex md:ml-[50vh]  mt-20 ' >

          <form className=' mr-10 border-1 form_login_register grid grid-cols-1 p-3 dark:bg-[#212533] bg-[#fff]  space-y-2  rounded-2xl text-start border-gray-600 border-1 z-[50]  ' onSubmit={onSubmit.bind(this)}>


            <Inputs
              name="email"
              placeholder="Email"

              type="text"
              icon="bi bi-envelope"
              onChangeHandler={onChangeHandler}
              errors={errors.email}
            />
            <Inputs
              name="password"
              placeholder="Password"

              type="password"
              icon="bi bi-key"
              onChangeHandler={onChangeHandler}
              errors={errors.password}
            />
            <div className="d-flex justify-content-between">

              <div className='flex space-x-6'>
                <button className="btn  flex btn-outline-warning w-[80%] md:w-auto  text-gray-400 ">
                
                   
                 Login
                </button>
                <Link to="/forget" className='no-underline'>Forgot your password?</Link>
              </div>

            </div>



          </form>
          <div className=' button-div w-fit h-full '>

            <p className='font-bold   text-[18px] text-slate-400 '> don't have an account ?</p>
            <button className='b' onClick={() => navigate("/register")} >register</button>
          </div>
        </div>




      </div>

    </div>
  );

}