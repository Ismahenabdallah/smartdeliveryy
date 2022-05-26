/* eslint-disable jsx-a11y/anchor-is-valid */

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap'

import AOS from "aos";
import "aos/dist/aos.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../App.scss';
import { NavLink } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import ResetPassword from './ResetPassword';
import ForgetPassword from './forgetPassword';
import {  useState } from 'react';
import { ThemeContext } from './themeContext';


import { Logout } from "../redux/actions/authActions";
import  Search   from  '../pages/Search'
import UpdateProfile from '../pages/UpdateProfile'
import InterfaceLivreur from '../pages/InterfaceLivreur'
import NotFound from '../pages/NotFound'
import NoAccess from '../pages/NoAccess'

import Admin from '../pages/Admin';
import Home from '../pages/Home';
import AdminRouter from './AdminRouter';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForceRedirect from './ForceRedirect';
import PrivateRouterClient from './PrivateRouterClient';
import PrivateRouterLivreur from './PrivateRouterLivreur';
import MyProfile from '../pages/MyProfile';
import SendEamil from './SendEmail'
import DetailProfile from '../pages/DetailProfile';







import { useDispatch } from "react-redux";
import Chat from '../pages/Chat';
import AjouterCl from './AjouterCl';
import AjouterL from './AjouterL';
import SetAvatar from './SetAvatar';
import Suivi from '../pages/Suivi';
import Chatl from '../pages/Chatl';





export default function Navbar({ user }) {

  
  AOS.init();
  const [darkMode, setDarkMode] = useState(ThemeContext);

  const dispatch = useDispatch()
  const LogoutHanlder = () => {
    dispatch(Logout())
  }
  

  /*const displayNotification = ({ form, type }) => {
    let action;

    if (type === 1) {
      action = "msg";
    }
    return (
      <span className="notification">{`${form} ${action} your post.`}</span>
    );
  };
  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };*/
  
 
  return (
    <div className={darkMode}>
     <nav className=" 
  fixed-top
  w-full
  flex flex-wrap
  items-center
  justify-between
  -mt-2
  capitalize
  bg-[#fff]
 
 shadow-sm

  navbar navbar-expand-lg navbar-light
  ">
         <div className="container-fluid w-full flex flex-wrap items-center justify-between dark:bg-[#212533]  -mb-2  md:-mb-2     p-2 ">  
                 <h1 className="navbar-brand  flex
        items-center
       
      
      
        lg:mt-0
        mr-1" >Delivery</h1>

         <button className="
      navbar-toggler 
      text-gray-500
      border-0
      hover:shadow-none hover:no-underline
      no-outline
      py-2
      px-2.5
      bg-transparent
      focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline
    " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars"
    className="w-6 n" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path fill="currentColor"
      d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z">
    </path>
  </svg>
  </button>

  <div className="collapse navbar-collapse flex-grow items-center" id="navbarSupportedContent">


  <ul className="navbar-nav flex flex-col pl-0 no-underline list-style-none mr-auto dark:text-[#fff] ">

             
   <li className="nav-item p-2  ">
      <NavLink className="nav-link p-0  active " to="/">Home</NavLink>
    </li>




              {user.role === "ADMIN" ? (
               <div className='flex'>
              <li className="nav-item  p-2  ">
                <NavLink className="nav-link p-0  active"  to="/admin">Admin</NavLink>
              </li>
              <div className="dropdown relative p-2 md:ml-[140vh]">
    <h6 className="dropdown-toggle flex items-center hidden-arrow" href="#" id="dropdownMenuButton2" role="button"
      data-bs-toggle="dropdown" aria-expanded="false">
     {user.fullname}
    </h6>
    <ul className="
    dropdown-menu
    min-w-max
    absolute

    bg-[#fff]
    text-base
    z-50
    float-left
    py-2
    list-none
    text-left
    rounded-lg
    shadow-lg
    mt-1
    hidden
    m-0
    bg-clip-padding
    border-none
    left-auto
    right-0
    dark:bg-slate-900
  " aria-labelledby="dropdownMenuButton2">
     
      <li className="dark:bg-slate-900  ">
      <NavLink className="dropdown-item
        text-sm
        py-2
        px-4
        font-normal
        block
        w-full
        whitespace-nowrap
        bg-transparent
        text-gray-700
         "  to="/" onClick={LogoutHanlder}>
             Logout
                    </NavLink>
                    </li> 
    </ul></div> 
               </div>
              
              ) : (
                ""
              )}
              {user.role === "LIVREUR" ? (
                <>
                
                  <li className="nav-item p-2">
                <NavLink  className="nav-link p-0 active" to ="/addprofile"> Profile</NavLink>
              </li>
                
            
        <li className="nav-item p-2">
                <NavLink  className="nav-link p-0 active" to ="/livreurchat"> Chat</NavLink>
              </li>
             
             
      
               
               
                    <div className="dropdown relative p-2 md:ml-[110vh]">
    <h6 className="dropdown-toggle flex items-center hidden-arrow" href="#" id="dropdownMenuButton2" role="button"
      data-bs-toggle="dropdown" aria-expanded="false">
     {user.fullname}
    </h6>
    <ul className="
    dropdown-menu
    min-w-max
    absolute

    bg-[#fff]
    text-base
    z-50
    float-left
    py-2
    list-none
    text-left
    rounded-lg
    shadow-lg
    mt-1
    hidden
    m-0
    bg-clip-padding
    border-none
    left-auto
    right-0
  " aria-labelledby="dropdownMenuButton2">
      <li>
        <NavLink className="
        dropdown-item
        text-sm
        py-2
        px-4
        font-normal
        block
        w-full
        whitespace-nowrap
        bg-transparent
        text-gray-700
    
      " to="myprofile">My Profile</NavLink>
      </li>
      <li className=" dark:bg-slate-900 ">
      <NavLink className="dropdown-item
        text-sm
        py-2
        px-4
        font-normal
        block
        w-full
        whitespace-nowrap
        bg-transparent
        text-gray-700
       "  to="/" onClick={LogoutHanlder}>
             Logout
                    </NavLink>
                    </li> 
    </ul></div> 
                </>
               
              ) : (
                ""
              )}
              {user.role === "CLIENT" ? (
                <>
                <li className="nav-item p-2">
                  <NavLink className=" nav-link p-0 active" aria-current="page" to="/interfaceclient">
                    interfaceClient
                  </NavLink>

                </li>


             
      
       
                <div className="dropdown relative p-2 md:ml-[130vh]">
    <h6 className="dropdown-toggle flex items-center hidden-arrow" href="#" id="dropdownMenuButton2" role="button"
      data-bs-toggle="dropdown" aria-expanded="false">
     {user.fullname}
    </h6>
    <ul className="
    dropdown-menu
    min-w-max
    absolute

    bg-[#fff]
    text-base
    z-50
    float-left
    py-2
    list-none
    text-left
    rounded-lg
    shadow-lg
    mt-1
    hidden
    m-0
    bg-clip-padding
    border-none
    left-auto
    right-0
    dark:bg-slate-900
  " aria-labelledby="dropdownMenuButton2">
     
      <li className="dark:bg-slate-900  ">
      <NavLink className="dropdown-item
        text-sm
        py-2
        px-4
        font-normal
        block
        w-full
        whitespace-nowrap
        bg-transparent
        text-gray-700
         "  to="/" onClick={LogoutHanlder}>
             Logout
                    </NavLink>
                    </li> 
    </ul></div> 
               
                </>
                
              ) : (
                ""
              )}
              {
                !user.isConnected ? (
                  <>


                    <li className="nav-item p-2  " >
                      <NavLink exact="true" className=" nav-link p-0 active  " to="/login">login</NavLink>
                    </li>
                    <li className="nav-item p-2 " >
                      <NavLink exact="true" className=" nav-link  p-0 active  " to="/register">register</NavLink>
                    </li>

                  </>
                ) : (
                
                  ""
                 
                )
              }

            </ul>












            <div className='mr-10'>
              {darkMode === 'dark' ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setDarkMode(darkMode === 'dark' ? 'light' : 'dark')
                  }}
                  className="text-gray-500 dark:text-gray-400  shadow-none p-2 focus:outline-none text-lg rounded-full outline-none ring-transparent cursor-pointer"
                >
                 <i className="bi bi-brightness-high"></i>
                
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setDarkMode(darkMode === 'dark' ? 'light' : 'dark')
                  }}
                  className="text-gray-500 dark:text-gray-400  focus:outline-none shadow-none p-2 text-lg rounded-full outline-none ring-transparent cursor-pointer"
                >
                 <i className="bi bi-moon"></i>
                </button>
              )}
            </div>


          </div>

        </div>
      </nav>


      <Routes >
        <Route path='/' exact element={<Home user={user} />} />
    
        <Route path='/login' exact element={<ForceRedirect user={user}>
          <Login  />
        </ForceRedirect>
        } />
        <Route path='/register' exact element={<ForceRedirect user={user}><Register /></ForceRedirect>} />

        <Route path='/interfaceClient' exact element={
          <PrivateRouterClient user={user}>
            <Search />
          </PrivateRouterClient>


        } />
         
       
       
        <Route path='*' exact element={<NotFound />} />
        <Route path='/noacc' exact element={<NoAccess />} />
        <Route path='/suivi' exact element={<Suivi />} />
        <Route path='/ajoutercl' exact element={<AjouterCl/>} />
        <Route path='/ajouterl' exact element={<AjouterL/>} />

        <Route path='/addprofile' exact element={
          <PrivateRouterLivreur user={user}>
            <InterfaceLivreur />
          </PrivateRouterLivreur>
        } />
        <Route path='/updateprofile' exact element={
          <PrivateRouterLivreur user={user}>
            <UpdateProfile />
          </PrivateRouterLivreur>
        } />
         
        
         <Route path='/myprofile' exact element={
          <PrivateRouterLivreur user={user}>
            <MyProfile />
          </PrivateRouterLivreur>
        } /> 
     
<Route path="/confirm/:confirmationCode" element={<SendEamil user={user}/>} />

<Route path="/forget" element={<ForgetPassword/>} exact />
<Route path="/reset/:token" element={<ResetPassword/>} exact />


        <Route path='/admin' exact element={
          <AdminRouter user={user}>
            <Admin />
          </AdminRouter>
        } />
  <Route path="/setavatar" exact element={
           
           <SetAvatar user={user} />
       
      } />
      <Route path='/:id' exact element={ 
            <DetailProfile />}/>
     
     
    
      <Route path="/clientchat/:id" exact element={< Chat /> } />
       
      <Route path="/livreurchat" exact element={< Chatl /> } />

      </Routes>



    </div>
  )
}

