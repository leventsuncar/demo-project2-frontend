import React from 'react';


import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.css';
import Dashboard from './layouts/Dashboard';
import Navi from './components/Navi';


const App = () => {




  return (
    <div className="App">
      <Navi/>

      <Dashboard />
    </div>
  );
}

export default App;
