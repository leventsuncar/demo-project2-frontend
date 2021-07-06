
import React from 'react';
import { Button } from 'primereact/button';
import { useHistory } from 'react-router';
const SignedIn = ({signOut}) => {
    
    
    
    return (
        
        <Button className = "danger"  label="Çıkış Yap" onClick={signOut} />
        
    );




}
export default SignedIn