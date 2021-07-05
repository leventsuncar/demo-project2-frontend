import React from 'react'
import Navi from '../components/Navi';
import MainPage from '../pages/MainPage';
import User from '../pages/User';
import { Route } from 'react-router-dom'
import { UserRegister } from '../pages/UserRegister';
import UserTable from '../components/UserTable';

const Dashboard = () => {
    return (
        <div>
            <Navi />
            <div className = "demo-container p-m-6">
            <Route exact path="/" component={MainPage} />
            <Route exact path="/usersTable" component={User} />
            <Route exact path="/register" component={UserRegister} />
            <Route exact path="/table" component={UserTable} />
            

           </div>
        </div>
    )
}
export default Dashboard;
