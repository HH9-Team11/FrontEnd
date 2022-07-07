import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Main from './pages/Main';
import Message from './pages/Message';
import MessageWrite from './pages/MessageWrite';
import Mypage from './pages/Mypage';
import Map from './pages/Map';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/mypage" exact component={Mypage} />
      <Route path="/messageList" exact component={Message} />
      <Route path="/messageWrite" exact component={MessageWrite} />

      <Route path='/map' exact component={Map} />
      <Route path='/login' exact component={Login} />
      <Route path='/signup' exact component={Signup} />

      <Redirect path="*" to="/" />
    </Switch>
  </BrowserRouter>
);

export default App;
