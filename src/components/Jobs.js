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
  }

  handleSubmit(obj) {
    this.setState(obj);
    this.getJobs();
  }

  getJobs() {
    let query = 'http://localhost:8080/api/jobs' + this.props.location.search;
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
          <div className="col s3">
            <SideBar { ...this.props } title={ this.state.title }
              state={ this.state.state } handleClick={ this.getJobs } />
          </div>
          <div className="col s9">
            <JobsTable handleSubmit={ this.handleSubmit } { ...this.props }
              jobs={ this.state.jobs } title={ this.state.title } state={ this.state.state } />
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs;
