import { combineReducers } from "redux";
import userReducer from "./reducer/userReducer";



const rootReducer = combineReducers({
    authState :userReducer
})

export default rootReducer;