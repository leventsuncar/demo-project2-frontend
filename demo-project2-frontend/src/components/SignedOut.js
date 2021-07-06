import React from 'react'
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';




const SignedOut = () => {
    const history = useHistory();
    
    const handleSignInClick= () => {

        return history.push("/login")


    }

    const handleSignUpClick= () => {

        return history.push("/register")


    }
    
   
    return (
        
            <div className = "navi-buttons">
            <Button  label="Giriş Yap" onClick={handleSignInClick} /> 
            <Button style ={{marginLeft:"2em"}} onClick ={ handleSignUpClick} label="Kayıt Ol" />

        </div>
           
     



    );


}
export default SignedOut