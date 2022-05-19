import axios from "axios";
import { All_Users, ERRORS } from "../types";

export const GetAllUsers = () => dispatch => {
    axios
        .get("http://localhost:5000/api/users")
        .then(res => {
            dispatch({
                type: All_Users,
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