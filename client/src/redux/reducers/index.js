import { combineReducers } from "redux";

import authReducer from './authReducer'
import errorsReducer from './errorsReducer'
import profileReducer from './profileReducer'
import allusersReducer from "./allusers.reducer";
export default combineReducers({
    auth: authReducer,
    errors: errorsReducer,
    profiles: profileReducer,
    users:allusersReducer

  
})