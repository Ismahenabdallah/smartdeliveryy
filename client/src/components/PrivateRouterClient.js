import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRouterClient = ({user, children}) =>{
   if(!user.isConnected){
     return <Navigate to="/login" replace/> 
   } 
   else{
    if(user.role !== "CLIENT"){
      return <Navigate to="/noacc" replace/> 
    }
   return children
}}

export default PrivateRouterClient






