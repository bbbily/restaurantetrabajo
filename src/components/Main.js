import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Jobs from './Jobs';
import AddJob from './AddJob';
import JobDetails from './JobDetails';
import '../componentsStyle/Main.css';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={ Jobs } />
      <Route exact path='/addjob' component={ AddJob } />
      <Route exact path='/jobs/:id' component={ JobDetails } />
    </Switch>
  </main>
)

export default Main;
