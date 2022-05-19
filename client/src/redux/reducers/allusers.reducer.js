import { All_Users } from "../types";
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
        default:
            return state;
    }
}