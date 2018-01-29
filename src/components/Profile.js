import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'react-materialize';
import axios from 'axios';
// import '../componentsStyle/Register.css';

class Profile extends Component {
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
      title: '',
      restaurant_exp: '',
      introduction: '',
      relocate: '',
      desired_salary: '',
      save: false
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    let url = '/api/me';
    axios({
      method: 'get',
      url: url
    }).then(res => {
      if (res.data) {
        this.setState(res.data)
      } else {
        this.setState({
          id: null
        })
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    let url = `/api/users/${ this.state.email }`;
    let data = { ...this.state };
    axios({
      method: 'put',
      url: url,
      data: data
    }).then(res => {
      this.setState({
        save: true
      })
    })
  }

  handleChange(e) {
    let target = e.target;
    this.setState({
      [target.name]: target.value,
      save: false
    })
  }

  render() {
    if (this.state.id === null) {
      return (<div><p>404 Page not found</p></div>)
    } else if (this.state.id === 1 && this.state.email === 'peng116233402@gmail.com') {
      return (
        <div className="admin">
          <div className="row">
            <div className="input-field col s4">
              <Link to="/adminjobs" className="btn waves-effect waves-light" type="submit">查看所有工作
              </Link>
            </div>
            <div className="input-field col s4">
              <Link to="/users" className="btn waves-effect waves-light" type="submit">查看所有会员资料
              </Link>
            </div>
            <div className="input-field col s4">
              <Link to="/appliedjob" className="btn waves-effect waves-light" type="submit">查看所有被申请的工作
              </Link>
            </div>
          </div>
        </div>
      );
    } else if (this.state.id !== 1 && this.state.email !== '') {
      return (
        <div className="profile">
          <form className="col s12 apply-job-form" onSubmit={ this.handleSubmit.bind(this) }>
            <div className="row">
              <div className="input-field col s12">
                <h4>Actualiza tu perfil:</h4>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12 m4 l3">
                <input name="name" onChange={ this.handleChange } type="text"
                  value={ this.state.name } className="validate" />
                  <label className="active" htmlFor="name">Nombre：</label>
              </div>
              <div className="input-field col s12 m4 l3">
                <input name="city" onChange={ this.handleChange } type="text"
                  value={ this.state.city } className="validate" />
                  <label className="active" htmlFor="city">Ciudad: </label>
              </div>
              <Input label="Estado：" s={12} m={4} l={3} type="select" onChange={ this.handleChange }
                value={ this.state.state } name="state">
                <option value=""></option>
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
                <input name="zipcode" onChange={ this.handleChange } type="text"
                  value={ this.state.zipcode } className="validate" />
                  <label className="active" htmlFor="zipcode">codigo postal: </label>
              </div>
              <div className="input-field col s12 m4 l3">
                <input name="title" onChange={ this.handleChange } type="text"
                  value={ this.state.title } className="validate" />
                <label className="active" htmlFor="title">posicion de trabajo deseado：</label>
              </div>
              <div className="input-field col s12 m4 l3">
                <input name="restaurant_exp" onChange={ this.handleChange } type="text"
                  value={ this.state.restaurant_exp } className="validate" />
                  <label className="active" htmlFor="restaurant_exp">Experiencia: </label>
                </div>
              <div className="input-field col s12 m4 l3">
                <input name="desired_salary" onChange={ this.handleChange } type="text"
                  value={ this.state.desired_salary } className="validate" />
                  <label className="active" htmlFor="desired_salary">Salario deseado: </label>
              </div>
              <Input label="Trasladarse:" s={12} m={4} l={3} type="select" onChange={ this.handleChange }
                value={ this.state.relocate } name="relocate">
                <option value="si">Si</option>
                <option value="no">No</option>
              </Input>
              <div className="input-field col s12 m4 l3">
                <input name="phone" onChange={ this.handleChange } type="text"
                  value={ this.state.phone } className="validate"/>
                <label className="active" htmlFor="phone">Telefono: </label>
              </div>
              <div className="input-field col s12">
                <input name="introduction" onChange={ this.handleChange } type="text"
                  value={ this.state.introduction } className="validate"/>
                <label className="active" htmlFor="introduction">introduccion: </label>
              </div>
              <div className="input-field col s12">
                <button className="btn waves-effect waves-light right" type="submit">Guardar
                </button>
              </div>
            </div>
          </form>
          { this.state.save &&
            <div className="row">
              <div className="input-field col s12 center">
                <h5 className="successed">Has actualizado tu perfil.</h5>
              </div>
            </div>
          }
        </div>
      )
    } else {
      return (
        <div>Loading...</div>
      )
    }
  }
}

export default Profile;
