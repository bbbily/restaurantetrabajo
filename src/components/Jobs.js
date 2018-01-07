import React, { Component } from 'react';
import SideBar from './SideBar';
import JobsTable from './JobsTable';
import axios from "axios";


class Jobs extends Component {
  constructor() {
    super();
    this.state = {
      jobs: [],
      queryObj: {
        jobTitle: '',
        state: '',
        jobType: '',
        salary: '',
        expertise: ''
      }
    }
    this.getJobs = this.getJobs.bind(this);
  }

  // updateQueryObj(obj) {
  //   this.setState({
  //     queryObj: { ...this.state.queryObj, ...obj }
  //   })
  // }

  getJobs() {
    let query = 'http://localhost:8080/api/jobs' + this.props.location.search;
    // for (let prop in queryObj) {
    //   if (queryObj[prop]) {
    //     if (url.includes('?')) {
    //       url += `&${queryObj[prop]}`
    //     } else {
    //       url += `?${queryObj[prop]}`
    //     }
    //   }
    // }
    console.log(query)
    axios({
      method: 'get',
      url: query
    }).then(res => {
      console.log(res)
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
    this.getJobs();
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col s3">
            <SideBar jobTitle={ this.state.queryObj.jobTitle } state={ this.state.queryObj.state } />
          </div>
          <div className="col s9">
            <JobsTable handleSubmit={ this.getJobs } { ...this.props } jobs={ this.state.jobs } />
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs;
