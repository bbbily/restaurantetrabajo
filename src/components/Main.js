import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Jobs from './Jobs';
import AddJob from './AddJob';
import JobDetails from './JobDetails';
import Thankyou from './Thankyou';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import '../componentsStyle/Main.css';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={ Jobs } />
      <Route exact path='/addjob' component={ AddJob } />
      <Route exact path='/jobs/:id' component={ JobDetails } />
      <Route exact path='/thankyou' component={ Thankyou } />
      <Route exact path='/account/login' component={ Login } />
      <Route exact path='/account/register' component={ Register } />
      <Route exact path='/account/profile' component={ Profile } />
    </Switch>
  </main>
)

export default Main;
