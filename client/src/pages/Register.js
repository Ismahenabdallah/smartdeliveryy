import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap'

import { useState } from 'react';
import '../App.scss';

import { useDispatch, useSelector } from 'react-redux'

import Inputs from '../components/Inputs'
import { Registration } from '../redux/actions/authActions'
import { useNavigate } from 'react-router';

export default function Register() {


  const [form, setForm] = useState({})
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch()
  const errors = useSelector(state => state.errors)

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value

    })

  }

  const navigate = useNavigate()
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(Registration(form,setMessage,setSuccessful))

  }

  return (
    <div className='container-fluid dark:text-gray-400 dark:bg-[#212533] h-[90vh] mt-10  '>



      <div className=' container overflow-x-hidden  items-center    mr-30  gap-x-14  flex  ' >

        <div className=' container mt-8 overflow-x-hidden  items-center  ' >


          <div className=' flex md:ml-[50vh]   ' >
            <form className=' mr-10 border-1 form_login_register grid grid-cols-1 p-4 dark:bg-[#212533] bg-[#fff]  space-y-2  rounded-2xl text-start border-gray-600 border-1 z-[50]  ' onSubmit={onSubmit}>

            {!successful && (
<>


              <Inputs name="fullname" placeholder="Nom et Prénon " type="text" icon="bi bi-person-fill" onChangeHandler={onChangeHandler} errors={errors.fullname} />
              <Inputs name="email" placeholder="Email" label="Email" type="text" icon="bi bi-envelope" onChangeHandler={onChangeHandler} errors={errors.email} />
              <Inputs name="password"  placeholder="Mot De Passe" label="Password" type="password" icon="bi bi-key" onChangeHandler={onChangeHandler} errors={errors.password} />
              <Inputs name="confirm" placeholder="Confirmation De Mot De Passe" type="password" icon="bi bi-key" onChangeHandler={onChangeHandler} errors={errors.confirm} />

              <div className='flex' > 
             <div className="form-check flex">
                <input   type="radio" name="role" id="role" value="LIVREUR" onChange={onChangeHandler}  required />
                <label className=" text-xl" >
                  Livreur
                </label>
                
    
              </div>
                <div className="form-check flex ">
                  <input   type="radio" name="role" value="CLIENT" id="role" onChange={onChangeHandler} required />
                  <label className="text-xl" >
                    Client
                  </label>
                  
         
        
                </div>
               
              </div>


              <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-outline-warning  text-gray-400 ">
              S'inscrire
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
            <div
              className='button-div w-fit h-full  '>
              <p className='font-bold   text-[18px] text-slate-400 '> Déjà  membre?</p>
              <button className='b'  onClick={() => navigate("/login")} >connexion</button>
            </div>
          </div>

        </div>



      </div>

    </div>
  );

}