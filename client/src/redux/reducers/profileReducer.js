/* eslint-disable import/no-anonymous-default-export */
import { DELETE_PROFILE,  GET_ID,  SET_PROFILE, SET_PROFILES } from "../types";

const intitialState = {
  profiles: [],
  profile: {},
};

export default function (state = intitialState, action) {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case SET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
      };
      case DELETE_PROFILE:
        return {
          ...state,
          profiles: state.profiles.filter(p =>p._id !== action.payload),
        };
      case GET_ID:
      return {
        ...state,
        profiles: action.payload,
      };
      
        

    default:
      return state;
  }
}

