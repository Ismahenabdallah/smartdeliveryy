import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateLogin = ({user, children}) =>{
   if(user.status === "Desactive"){
     return <Navigate to="/register" replace/> 
   }
   return children
}

export default PrivateLogin