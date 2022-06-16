import axios from 'axios'
import { ERRORS, SET_PROFILE, SET_PROFILES, DELETE_PROFILE, GET_ID } from '../types';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
export const AddProfile = (formData, config) => dispatch => {
    axios
        .post("/api/add", formData, config)
        .then(res => {
          
       
toast.success('Profile added with success',toastOptions)
            dispatch({
                type: ERRORS,
                payload: {}
            })
            
        })
        .catch(err => {
            dispatch({
                type: ERRORS,
                payload: err.response.data
            })
        });
}//// headers: {   "Content-type": "application/json"}
///One Profile
export const GetProfile = () => dispatch => {
    axios
        .get("http://localhost:5000/api/profile")
        .then(res => {
            dispatch({
                type: SET_PROFILE,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: ERRORS,
                payload: err.response.data
            })
        });
}
///all Profiles
export const GetAllProfiles = () => dispatch => {
    axios
        .get("http://localhost:5000/api/allprofiles")
        .then(res => {
            dispatch({
                type: SET_PROFILES,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: ERRORS,
                payload: err.response.data
            })
        });
}

export const DeleteProfile = (id) => dispatch => {
    if (window.confirm("are you sure to delete this profile?")) {
        axios
            .delete(`http://localhost:5000/api/profiles/${id}`)
            .then(res => {
                dispatch({
                    type: DELETE_PROFILE,
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


export const DetailsProfile = (id) => dispatch => {

    axios.get(`http://localhost:5000/api/${id}`)
        .then(res => {
            dispatch({
                type: GET_ID,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: ERRORS,
                payload: err.response.data
            })
        });

}

/*
export const DetailsProfile = (id)=>dispatch=>{
  
  
   try {
     const response =  axios
     .get(`http://localhost:5000/api/${id}`)
     return response.data;
   } catch (err) {
     return err.response.data;
   }
 }*/