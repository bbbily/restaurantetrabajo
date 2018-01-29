import React, { Component } from 'react';
import axios from 'axios';
import '../componentsStyle/AdminJob.css';

class AdminJobs extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      email: '',
      adminJobs: []
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
          url: '/api/jobs'
        }).then(res => {
          this.setState({
            adminJobs: res.data
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
    let url = `/api/jobs/${ id }`;
    axios({
      method: 'delete',
      url: url
    }).then(res => {
      let adminJobs = this.state.adminJobs;
      for (let i=0; i<adminJobs.length; i++) {
        if (adminJobs[i].id === res.data[0].id) {
          this.setState({
            adminJobs: [ ...adminJobs.slice(0, i), ...adminJobs.slice(i+1, adminJobs.length) ]
          })
          return;
        }
      }
    })
  }

  render() {
    if (this.state.id === 1 && this.state.email === 'peng116233402@gmail.com') {
      let jobs = this.state.adminJobs.map(job => (
        <tr key={ job.id }>
          <td>{ job.company_type }</td>
          <td>{ job.title }</td>
          <td>{ job.salary || '面议' }</td>
          <td>{ job.experience }</td>
          <td>{ job.city }</td>
          <td>{ job.state.toUpperCase() }</td>
          <td>{ job.phone }</td>
          <td>{ job.post_date }</td>
          <td><a onClick={ this.handleClick.bind(this, job.id) }>删除此工作</a></td>
        </tr>
      ))
      return (
        <div className="admin-job">
          <h4 className="center">所有工作列表</h4>
          <table>
            <thead>
              <tr>
                  <th>餐馆类型</th>
                  <th>职位</th>
                  <th>工资</th>
                  <th>经验要求</th>
                  <th>城市</th>
                  <th>州</th>
                  <th>电话</th>
                  <th>发布日期</th>
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

export default AdminJobs;
