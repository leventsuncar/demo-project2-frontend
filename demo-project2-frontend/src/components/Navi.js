import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import SignedOut from './SignedOut';
import SignedIn from './SignedIn';
import { useState } from 'react';
import { useHistory } from 'react-router';

const Navi = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const history = useHistory();
    
    
    function handleSignOut(params) {
        setIsAuthenticated(false)
        history.push("/")
    }
    function handleSignIn(params) {
        setIsAuthenticated(true)
    }


    const items = [

        {
            label: 'Kullanıcılar',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'Yeni Kullanıcı',
                    icon: 'pi pi-fw pi-user-plus',
                    command: () => {
                        window.location = "/register";
                    },
                },
                {
                    label: 'Kullanıcı Sil',
                    icon: 'pi pi-fw pi-user-minus',

                },
                {
                    label: 'Listele',
                    icon: 'pi pi-fw pi-users',
                    command: () => {
                        window.location = "/table";
                    }
                }
            ]
        },
       
      
        
    ];

    const start = <img alt="logo" src="showcase/images/logo.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="p-mr-2"></img>;
    const end = <div>  {isAuthenticated ? <SignedIn signOut={handleSignOut} /> : <SignedOut signIn={handleSignIn} />
            
} </div> 
   
    return (
        <div> 
            <div className="card">
                <Menubar model={items} start={start} end = {end} />
                
            </div>
        </div>
    );
}
export default Navi;