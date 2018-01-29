import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Users extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      email: '',
      users: []
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
          url: '/api/users'
        }).then(res => {
          this.setState({
            users: res.data
          })
        })
      } else {
        this.setState({
          id: null
        })
      }
    })
  }

  handleClick(email, e) {
    e.preventDefault();
    let url = `/api/users/${ email }`;
    axios({
      method: 'delete',
      url: url
    }).then(res => {
      let users = this.state.users;
      for (let i=0; i<users.length; i++) {
        if (users[i].email === res.data[0].email) {
          this.setState({
            users: [ ...users.slice(0, i), ...users.slice(i+1, users.length) ]
          })
          return;
        }
      }
    })
  }

  render() {
    if (this.state.id === 1 && this.state.email === 'peng116233402@gmail.com') {
      let jobs = this.state.users.map(user => (
        <tr key={ user.id }>
          <td><Link to={ `/user/${ user.email }` }>{ user.name || '未输入' }</Link></td>
          <td>{ user.city }</td>
          <td>{ user.state.toUpperCase() }</td>
          <td>{ user.phone }</td>
          <td>{ user.title }</td>
          <td>{ user.relocate }</td>
          <td>{ user.desired_salary }</td>
          <td>{ user.restaurant_exp }</td>
          <td><a onClick={ this.handleClick.bind(this, user.email) }>删除此用户</a></td>
        </tr>
      ))
      return (
        <div className="admin">
          <h4 className="center">所有用户</h4>
          <table>
            <thead>
              <tr>
                  <th>用户名字</th>
                  <th>城市</th>
                  <th>州</th>
                  <th>电话</th>
                  <th>职位</th>
                  <th>可否搬家</th>
                  <th>期望工资</th>
                  <th>工作经验</th>
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

export default Users;
