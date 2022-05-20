import { All_Users, DELETE_User } from "../types";
const intitialState = {
    users: [],
   
  };
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = intitialState, action) {
    switch (action.type) {
        case All_Users:
            return {
                ...state,
                users: action.payload,
            };
            case DELETE_User:
                return {
                  ...state,
                  users: state.users.filter(p =>p._id !== action.payload),
                };
        default:
            return state;
    }
}