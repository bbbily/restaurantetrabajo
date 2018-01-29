import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Jobs from './Jobs';
import AddJob from './AddJob';
import JobDetails from './JobDetails';
import Thankyou from './Thankyou';
import Login from './Login';
import AppliedJob from './AppliedJob';
import AdminJobs from './AdminJobs';
import Users from './Users';
import Register from './Register';
import Profile from './Profile';
import UserDetails from './UserDetails';
import AppliedJobDetails from './AppliedJobDetails';
import '../componentsStyle/Main.css';

class Main extends Component {
  updateAuth() {
    this.props.updateAuth();
  }
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={ Jobs } />
          <Route exact path='/addjob' component={ AddJob } />
          <Route exact path='/jobs/:id' component={ JobDetails } />
          <Route exact path='/thankyou' component={ Thankyou } />
          {/* <Route exact path='/account/login' component={ Login } updateAuth={ this.updateAuth.bind(this) } /> */}
          <Route exact path='/account/login' render={(props) => (<Login {...props} updateAuth={this.updateAuth.bind(this)} />)} />
          <Route exact path='/appliedjob' component={ AppliedJob } />
          <Route exact path='/appliedjob/:id' component={ AppliedJobDetails } />
          <Route exact path='/adminjobs' component={ AdminJobs } />
          <Route exact path='/account/register' component={ Register } />
          <Route exact path='/users/:id' component={ Profile } />
          <Route exact path='/user/:email' component={ UserDetails } />
          <Route exact path='/users' component={ Users } />
        </Switch>
      </main>
    )
  }
}

export default Main;
