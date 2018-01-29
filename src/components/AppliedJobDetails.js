import React, { Component } from 'react';
import axios from 'axios';

class AppliedJobDetails extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      title: '',
      company_type: '',
      experience: '',
      salary: '',
      company_name: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zipcode: '',
      free_housing: '',
      chinese_desc: '',
      person_name: '',
      person_city: '',
      person_state: '',
      person_phone: '',
      apply_date: ''
    }
  }

  componentWillMount() {
    this.getAppliedJobDetails();
  }

  getAppliedJobDetails() {
    let jobId = this.props.match.params.id;
    let url = `/api/appliedJob/${ jobId }`;
    axios({
      method: 'get',
      url: url
    }).then(res => {
      this.setState(res.data);
    })
  }

  render() {
    return (
      <div className="user-details">
        <div className="row">
          <div className="input-field col s12">
            <h4 className="center">已申请工作资料</h4>
          </div>
          <div className="input-field col s12 m6 l4">
            <p>工作职位: { this.state.title }</p>
          </div>
          <div className="input-field col s12 m6 l4">
            <p>公司名称: { this.state.company_name }</p>
          </div>
          <div className="input-field col s12 m6 l4">
            <p>公司类型: { this.state.company_type }</p>
          </div>
          <div className="input-field col s12 m6 l4">
            <p>工资: { this.state.salary }</p>
          </div>
          <div className="input-field col s1 m6 l4">
            <p>公司电话: { this.state.phone }</p>
          </div>
          <div className="input-field col s12 m6 l4">
            <p>公司地址: { this.state.street }</p>
          </div>
          <div className="input-field col s12 m6 l4">
            <p>公司城市: { this.state.city }</p>
          </div>
          <div className="input-field col s12 m6 l4">
            <p>公司州: { this.state.state }</p>
          </div>
          <div className="input-field col s12 m6 l4">
            <p>公司邮编: { this.state.zipcode }</p>
          </div>
          <div className="input-field col s12 m6 l4">
            <p>申请人名字: { this.state.person_name }</p>
          </div>
          <div className="input-field col s12 m6 l4">
            <p>申请人城市: { this.state.person_city }</p>
          </div>
          <div className="input-field col s12 m6 l4">
            <p>申请人州: { this.state.person_state }</p>
          </div>
          <div className="input-field col s12 m6 l4">
            <p>申请人电话: { this.state.person_phone }</p>
          </div>
          <div className="input-field col s12 m6 l4">
            <p>申请日期: { this.state.apply_date }</p>
          </div>
          <div className="input-field col s12 m6 l4">
            <p>工作描述: { this.state.description }</p>
          </div>
        </div>
      </div>
    );
  }
}

export default AppliedJobDetails;
