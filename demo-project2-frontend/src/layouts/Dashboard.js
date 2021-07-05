import React from 'react'
import Navi from '../components/Navi';
import MainPage from '../pages/MainPage';
import User from '../pages/User';
import { Route } from 'react-router-dom'
import { UserRegister } from '../pages/UserRegister';

const Dashboard = () => {
    return (
        <div>
            <Navi />
            <div className = "demo-container p-m-6">
            <Route exact path="/" component={MainPage} />
            <Route exact path="/usersTable" component={User} />
            <Route exact path="/register" component={UserRegister} />

           </div>
        </div>
    )
}
export default Dashboard;
