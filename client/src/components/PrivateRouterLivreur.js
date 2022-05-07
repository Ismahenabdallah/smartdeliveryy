import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRouterLivreur = ({user, children}) =>{
   if(!user.isConnected){
     return <Navigate to="/login" replace/> 
   } 
   else{
    if(user.role !== "LIVREUR"){
      return <Navigate to="/noacc" replace/> 
    }
   return children
}}

export default PrivateRouterLivreur






