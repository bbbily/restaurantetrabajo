import React, { Component } from 'react';
import SideBar from './SideBar';
import JobsTable from './JobsTable';
import axios from "axios";

class Jobs extends Component {
  constructor() {
    super();
    this.state = {
      jobs: [],
      title: '',
      state: '',
      company_type: '',
      salary: '',
      experience: ''
    }
    this.getJobs = this.getJobs.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSubmit(obj) {
    this.setState(obj);
    this.getJobs();
  }

  handleClick(key, value) {
    this.setState({
      [key]: value
    })
    this.getJobs();
  }

  getJobs() {
    let query = '/api/jobs' + this.props.location.search;
    axios({
      method: 'get',
      url: query
    }).then(res => {
      this.setState({
        jobs: res.data
      })
    })
  }

  componentWillMount() {
    if (this.props.location.search) {
      let query = this.props.location.search.replace('?', '').split('&');
      let obj = {};
      query.forEach(str => {
        let arr = str.split('=');
        obj[arr[0]] = arr[1].replace(/%20/g, ' ');
      })
      this.setState(obj);
    }
    this.getJobs();
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12 m2">
            <SideBar { ...this.props } stateObj={ this.state } handleClick={ this.handleClick } />
          </div>
          <div className="col s12 m10">
            <JobsTable handleSubmit={ this.handleSubmit } { ...this.props }
              jobs={ this.state.jobs } title={ this.state.title } state={ this.state.state } />
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs;
