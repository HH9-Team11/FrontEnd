import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './pages/Main';
import Map from './pages/Map';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={Main} />
      <Route path='/map' exact component={Map} />
      <Route path='/login' exact component={Login} />
      <Route path='/signup' exact component={Signup} />
    </Switch>
  </BrowserRouter>
);

export default App;
