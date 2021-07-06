
import React from 'react';
import { Button } from 'primereact/button';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { signOutAction } from '../authentication/actions/authActions';
const SignedIn = () => {
    
    const dispatch = useDispatch();


   const handleSignOut = () => {
    dispatch(signOutAction());

    }
    
    return (
        
        <Button className = "p-button-danger"  label="Çıkış Yap" onClick={handleSignOut} />
        
    );




}
export default SignedIn