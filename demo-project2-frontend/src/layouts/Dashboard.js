import React from 'react'
import Navi from '../components/Navi';
import MainPage from '../pages/MainPage';
import { Route } from 'react-router-dom'
import { UserRegister } from '../pages/UserRegister';
import UserTable from '../components/UserTable';
import Login from '../components/Login';
import UserUpdate from '../components/UserUpdate';

const Dashboard = () => {
    




    return (
        <div>
            
            <div className = "demo-container p-m-6">
            <Route exact path="/" component={MainPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={UserRegister} />
            <Route exact path="/table" component={UserTable} />
            <Route exact path="/updateUser/:id" component={UserUpdate} />
            

           </div>
        </div>
    )
}
export default Dashboard;
