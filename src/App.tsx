import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './pages/Main';

const App:React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Main} />
    </Switch>
  </BrowserRouter>
)

export default App;
