import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Input } from 'react-materialize';

class JobDetails extends Component {
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
      description: '',
      person_name: '',
      person_city: '',
      person_state: '',
      person_phone: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.getJobDetails();
  }

  getJobDetails() {
    let jobId = this.props.match.params.id;
    let url = `http://localhost:8080/api/jobDetails/${ jobId }`;
    axios({
      method: 'get',
      url: url
    }).then(res => {
      this.setState(res.data[0]);
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    let url = 'http://localhost:8080/api/appliedJob';
    let date = new Date();
    let applyDate = `${ date.getMonth() + 1 }/${ date.getDate() }/${ date.getFullYear() }`;
    let data = {};
    data.id = this.state.id;
    data.apply_date = applyDate;
    data.person_name = this.state.person_name;
    data.person_city = this.state.person_city;
    data.person_state = this.state.person_state;
    data.person_phone = this.state.person_phone;
    axios({
      method: 'post',
      url: url,
      data: data
    }).then(res => {
      console.log(res, this.props)
      this.props.history.push('/')
    })
  }

  handleChange(e) {
    let target = e.target;
    this.setState({
      [target.name]: target.value
    })
  }

  render() {
    if (!this.state.id) return <div>PAGE NOT FOUND!</div>
    return (
      <div>
        <div className="row">
          <div className="input-field col s12 m6">
            <h4>{ this.state.title }</h4>
          </div>
          <div className="input-field col s12 m6">
            <p>Location: { (this.state.city ? `${ this.state.city }, ` : '') + this.state.state.toUpperCase() + ` ${ this.state.zipcode }` }</p>
          </div>
          <div className="input-field col s12">
            <p>Job Description: { this.state.description }</p>
          </div>
          <div className="input-field col s12 m6 l4">
            <p>Nivel De Experiencia: { this.state.experience }</p>
          </div>
          <div className="input-field col s12 m6 l4">
            <p>Numero De Contacto: { this.state.phone || '6156689287' }</p>
          </div>
          <div className="input-field col s12 m6 l4">
            <p>Salario: { this.state.salary || 'Negociable' }</p>
          </div>
          <div className="input-field col s12 m6 l4">
            <p>Vivienda libre: { this.state.free_housing }</p>
          </div>
        </div>
        <form className="col s12 apply-job-form" onSubmit={ this.handleSubmit.bind(this) }>
          <div className="row">
            <div className="col s12">
              <h4>Apply for this job:</h4>
            </div>
            <div className="input-field col s12 m4 l3">
              <input name="person_name" onChange={ this.handleChange } type="text"
                value={ this.state.person_name } className="validate" />
              <label htmlFor="person_name">Name：</label>
            </div>
            <div className="input-field col s12 m4 l3">
              <input name="person_city" onChange={ this.handleChange } type="text"
                value={ this.state.person_city } className="validate" />
              <label htmlFor="person_city">City: </label>
            </div>
            <Input label="State：" s={12} m={4} l={3} type="select" onChange={ this.handleChange }
              value={ this.state.person_state } name="person_state">
              <option value="al">AL</option>
              <option value="ak">AK</option>
              <option value="ar">AR</option>
              <option value="az">AZ</option>
              <option value="ca">CA</option>
              <option value="co">CO</option>
              <option value="ct">CT</option>
              <option value="dc">DC</option>
              <option value="de">DE</option>
              <option value="fl">FL</option>
              <option value="ga">GA</option>
              <option value="hi">HI</option>
              <option value="ia">IA</option>
              <option value="id">ID</option>
              <option value="il">IL</option>
              <option value="in">IN</option>
              <option value="ks">KS</option>
              <option value="ky">KY</option>
              <option value="la">LA</option>
              <option value="ma">MA</option>
              <option value="md">MD</option>
              <option value="me">ME</option>
              <option value="mi">MI</option>
              <option value="mn">MN</option>
              <option value="mo">MO</option>
              <option value="ms">MS</option>
              <option value="mt">MT</option>
              <option value="nc">NC</option>
              <option value="ne">NE</option>
              <option value="nh">NH</option>
              <option value="nj">NJ</option>
              <option value="nm">NM</option>
              <option value="nv">NV</option>
              <option value="ny">NY</option>
              <option value="nd">ND</option>
              <option value="oh">OH</option>
              <option value="ok">OK</option>
              <option value="or">OR</option>
              <option value="pa">PA</option>
              <option value="ri">RI</option>
              <option value="sc">SC</option>
              <option value="sd">SD</option>
              <option value="tn">TN</option>
              <option value="tx">TX</option>
              <option value="ut">UT</option>
              <option value="vt">VT</option>
              <option value="va">VA</option>
              <option value="wa">WA</option>
              <option value="wi">WI</option>
              <option value="wv">WV</option>
              <option value="wy">WY</option>
            </Input>
            <div className="input-field col s12 m4 l3">
              <input name="person_phone" onChange={ this.handleChange } type="text"
                value={ this.state.person_phone } className="validate" />
              <label htmlFor="person_phone">Phone: </label>
            </div>
            <div className="input-field col s12">
              <button className="btn waves-effect waves-light" type="submit">发布(Send)
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default JobDetails;
