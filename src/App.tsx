import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './pages/Main';
import Map from './pages/Map';

const App:React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/map" exact component={Map} />
    </Switch>
  </BrowserRouter>
)

export default App;
