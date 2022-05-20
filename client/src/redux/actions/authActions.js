import axios from 'axios';
import {  DELETE_User, ERRORS, SET_USER } from '../types';
import jwt_decode from 'jwt-decode'
import { setAuth } from '../../util/setAuth';


export const Registration = (form,setMessage,setSuccessful)=>dispatch=>{
      axios.post('/api/register', form) 
      .then(res=>{
        setMessage("verify your email please")
        setSuccessful(true)
        dispatch({
            type: ERRORS,
            payload: {}
        })
      })
      .catch(err=>{
          dispatch({
              type: ERRORS,
              payload: err.response.data
          })
      })
}
export const RegisterL = (form ,setMessage,setSuccessful)=>dispatch=>{
    axios.post('/api/liv', form) 
    .then(res=>{
        setMessage(" added with success")
        setSuccessful(true)

      dispatch({
          type: ERRORS,
          payload: {}
      })
    })
    .catch(err=>{
        dispatch({
            type: ERRORS,
            payload: err.response.data
        })
    })
}
export const RegisterC = (form,setMessage,setSuccessful)=>dispatch=>{
    axios.post('/api/cli', form) 
    .then(res=>{
    
        setMessage(" added with success")
        setSuccessful(true)
      dispatch({
          type: ERRORS,
          payload: {}
      })
    
    })
    .catch(err=>{
        dispatch({
            type: ERRORS,
            payload: err.response.data
        })
    })
}

export const LoginAction = (form)=>dispatch=>{
    axios.post('/api/login', form) 
    .then(res=>{
      const {token} = res.data
      localStorage.setItem('jwt', token)
      const decode = jwt_decode(token)
      dispatch(setUser(decode))
      setAuth(token)
     
       })
    .catch(err=>{
        dispatch({
            type: ERRORS,
            payload: err.response.data
        })
       
    })
}

export const DeleteUser = (id) => dispatch => {
    if (window.confirm("are you sure to delete this user?")) {
        axios
            .delete(`http://localhost:5000/api/deluser/${id}`)
            .then(res => {
                dispatch({
                    type: DELETE_User,
                    payload: id
                })
            })
            .catch(err => {
                dispatch({
                    type: ERRORS,
                    payload: err.response.data
                })
            });
    }
  }

export const Logout = ()=>dispatch=>{
    localStorage.removeItem('jwt')
    dispatch({
        type: SET_USER,
        payload: {}
    })
}

export const setUser = (decode)=>({
    type: SET_USER,
    payload: decode
})