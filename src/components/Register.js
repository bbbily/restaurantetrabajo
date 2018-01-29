import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      retype_email: '',
      password: '',
      retype_password: '',
      error: false
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    this.setState({
      [target.name]: target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.email === this.state.retype_email
      && this.state.password === this.state.retype_password
      && this.state.password !== '' && this.state.retype_password !== ''
      && this.state.email !== '' && this.state.retype_email !== '' ) {
      let url = '/api/register';
      let date = new Date();
      let registerDate = `${ date.getMonth() + 1 }/${ date.getDate() }/${ date.getFullYear() }`;
      let data = {};
      data = { ...this.state, register_date: registerDate };
      axios({
        method: 'post',
        url: url,
        data: data
      }).then(res => {
        this.props.history.push('/');
      })
    } else {
      this.setState({
        error: true
      })
    }
  }
  render() {
    return (
      <div className="register">
        <div className="register-container row">
          <h4>Crea una cuenta</h4>
          <form className="col s12" onSubmit={ this.handleSubmit.bind(this) }>
            <div className="input-field col s12">
              <input name="email" id="email1" type="email" className="validate"
              onChange={ this.handleChange }/>
              <label htmlFor="email1">Email</label>
            </div>
            <div className="input-field col s12">
              <input name="retype_email" id="email2" type="email" className="validate"
              onChange={ this.handleChange }/>
              <label htmlFor="email2">Escriba nuevamente el email</label>
            </div>
            <div className="input-field col s12">
              <input name="password" id="password" type="password" className="validate"
              onChange={ this.handleChange }/>
              <label htmlFor="password">Contrasena</label>
            </div>
            <div className="input-field col s12">
              <input name="retype_password" id="retype_password" type="password" className="validate"
              onChange={ this.handleChange }/>
              <label htmlFor="retype_password">Escriba nuevamente el contrasena</label>
            </div>
            <div className="input-field col s12">
              <button className="btn waves-effect waves-light" type="submit">
                Enviar
              </button>
            </div>
            { this.state.error &&
              <div className="input-field col s12">
                <p className="error">El correo electronico o la contrasena no coinciden!</p>
            </div> }
          </form>
          {/* <div className="col s12">
            <p>or</p>
          </div>
          <div className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <button className="btn waves-effect waves-light">
                  Sign in with Google
                </button>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <button className="btn waves-effect waves-light">
                  Sign in with Facebook
                </button>
              </div>
            </div>
          </div> */}
          <Link to="/account/login">Tener una cuenta? Registrarse</Link>
        </div>
      </div>
    );
  }
}

export default Register;
