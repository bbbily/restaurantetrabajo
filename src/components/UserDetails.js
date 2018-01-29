import React, { Component } from 'react';
import axios from 'axios';

class UserDetails extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      email: '',
      name: '',
      city: '',
      state: '',
      zipcode: '',
      phone: '',
      register_date: '',
      title: '',
      restaurant_exp: '',
      introduction: '',
      relocate: '',
      desired_salary: ''
    }
  }

  componentWillMount() {
    this.getUserDetails();
  }

  getUserDetails() {
    let userEmail = this.props.match.params.email;
    let url = `/api/users/${ userEmail }`;
    axios({
      method: 'get',
      url: url
    }).then(res => {
      console.log(res.data)
      this.setState(res.data);
    })
  }

  render() {
    return (
      <div className="user-details">
        <div className="row">
          <div className="input-field col s12">
            <h4 className="center">用户资料</h4>
          </div>
          <div className="input-field col s12 m6 l4">
            <p>名字: { this.state.name }</p>
          </div>
          <div className="input-field col s12 m6 l4">
            <p>Email: { this.state.email }</p>
          </div>
          <div className="input-field col s1 m6 l4">
            <p>电话: { this.state.phone }</p>
          </div>
          <div className="input-field col s12 m6 l4">
            <p>城市: { this.state.city }</p>
          </div>
          <div className="input-field col s12 m6 l4">
            <p>州: { this.state.state }</p>
          </div>
          <div className="input-field col s12 m6 l4">
            <p>邮编: { this.state.zipcode }</p>
          </div>
          <div className="input-field col s12 m6 l4">
            <p>期望薪资: { this.state.desired_salary }</p>
          </div>
          <div className="input-field col s12 m6 l4">
            <p>可否搬家: { this.state.relocate }</p>
          </div>
          <div className="input-field col s12 m6 l4">
            <p>职位: { this.state.title }</p>
          </div>
          <div className="input-field col s12 m6 l4">
            <p>注册日期: { this.state.register_date }</p>
          </div>
          <div className="input-field col s12 m6 l4">
            <p>自我介绍: { this.state.introduction }</p>
          </div>
        </div>
      </div>
    );
  }
}

export default UserDetails;
