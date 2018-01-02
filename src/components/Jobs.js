import React, { Component } from 'react';
import SideBar from './SideBar';
import JobsTable from './JobsTable';
import axios from "axios";


class Jobs extends Component {
  constructor() {
    super();
    this.state = {
      jobs: [],
      jobTitle: '',
      state: '',
      jobType: '',
      salary: null,
      expertise: ''
    }
  }

  getJobs(queryObj) {
    axios({
      method: 'get',
      url: 'http://localhost:8080/api/jobs'
    }).then(res => {
      this.setState({
        jobs: res.data
      })
    })
  }

  componentWillMount() {
    let jobs = [
      {
        id: 1,
        jobTitle: 'sushi chef',
        jobType: 'full-time',
        salary: 3000,
        state: 'UT',
        expertise: 'senior',
        contactNumber: '616-990-8785',
        postDate: '12-30-2017',
        detail: 'dfadfasdfasdfasd'
      },
      {
        id: 2,
        jobTitle: 'stirfry chef',
        jobType: 'full-time',
        salary: 3100,
        state: 'OH',
        expertise: 'mid',
        contactNumber: '616-990-8785',
        postDate: '12-30-2017'
      },
      {
        id: 3,
        jobTitle: 'server',
        jobType: 'part-time',
        salary: 3000,
        state: 'NY',
        expertise: 'entry',
        contactNumber: '616-990-8785',
        postDate: '12-30-2017'
      }

    ];
    // this.setState({
    //   jobs: jobs
    // })
    this.getJobs();
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col s3">
            <SideBar jobTitle={ this.state.jobTitle } state={ this.state.state } />
          </div>
          <div className="col s9">
            <JobsTable jobs={ this.state.jobs } />
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs;
