
import { SIGN_IN, SIGN_OUT } from "../actions/authActions";
import { isAuth } from "../initialValues/authInitialValue";

const initialState = {
    isAuth: isAuth
}

export default function userReducer(state = initialState, { type }) {

    switch (type) {
        case SIGN_IN:

           return{
               ...isAuth, isAuth: {value: true}
           }
           
           
           case SIGN_OUT:
            return{
                ...isAuth, isAuth: {value: false}
            }
           
           default:
                
                 return isAuth;
           

       }  


            

           
               
            
   

}