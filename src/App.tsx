import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Main from './pages/Main';
import Message from './pages/Message';
import MessageWrite from './pages/MessageWrite';
import Mypage from './pages/Mypage';

const App:React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Main} />





      
      <Route path="/mypage" exact component={Mypage} />
      <Route path="/messageList" exact component={Message} />
      <Route path="/messageWrite" exact component={MessageWrite} />

      <Redirect path="*" to="/" />
    </Switch>
  </BrowserRouter>
)

export default App;
