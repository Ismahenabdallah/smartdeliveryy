import React from 'react'
import { Navigate } from 'react-router-dom'
/*
KIF TEBDA CONNECTE M TADHERLIKCH PAGE INSCRIRE */
const ForceRedirectHome = ({user, children}) =>{
    if(!user.isConnected){
        return <Navigate to="/" replace/> 
      } 
      return children
}

export default ForceRedirectHome