import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class AppliedJob extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      email: '',
      appliedJobs: []
    }
  }

  componentWillMount() {
    let url = '/api/me';
    axios({
      method: 'get',
      url: url
    }).then(res => {
      if (res.data) {
        this.setState({
          id: res.data.id,
          email: res.data.email
        });
        axios({
          method: 'get',
          url: '/api/appliedJob'
        }).then(res => {
          this.setState({
            appliedJobs: res.data
          })
        })
      } else {
        this.setState({
          id: null
        })
      }
    })
  }

  handleClick(id, e) {
    e.preventDefault();
    let url = `/api/appliedJob/${ id }`;
    axios({
      method: 'delete',
      url: url
    }).then(res => {
      let appliedJobs = this.state.appliedJobs;
      for (let i=0; i<appliedJobs.length; i++) {
        if (appliedJobs[i].id === res.data[0].id) {
          this.setState({
            appliedJobs: [ ...appliedJobs.slice(0, i), ...appliedJobs.slice(i+1, appliedJobs.length) ]
          })
          return;
        }
      }
    })
  }

  render() {
    if (this.state.id === 1 && this.state.email === 'peng116233402@gmail.com') {
      let jobs = this.state.appliedJobs.map(job => (
        <tr key={ job.id }>
          <td><Link to={ `/appliedjob/${ job.id }` }>{ job.title }</Link></td>
          <td>{ job.state.toUpperCase() }</td>
          <td>{ job.salary || '面议' }</td>
          <td>{ job.phone }</td>
          <td>{ job.person_name }</td>
          <td>{ job.person_state.toUpperCase() }</td>
          <td>{ job.person_phone }</td>
          <td>{ job.apply_date }</td>
          <td><a onClick={ this.handleClick.bind(this, job.id) }>删除此工作</a></td>
        </tr>
      ))
      return (
        <div className="admin">
          <h4 className="center">所有已申请的工作</h4>
          <table>
            <thead>
              <tr>
                <th>职位</th>
                <th>州</th>
                <th>工资</th>
                <th>餐馆电话</th>
                <th>申请人名字</th>
                <th>申请人州</th>
                <th>申请人电话</th>
                <th>申请日期</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { jobs }
            </tbody>
          </table>
        </div>
      )
    } else {
      return (
        <div>404 Page not found.</div>
      )
    }
  }
}

export default AppliedJob;
