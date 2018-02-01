import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../componentsStyle/Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: false
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let url = '/auth/local';
    let data = {};
    data = { ...this.state };
    axios({
      method: 'post',
      url: url,
      data: data
    }).then(res => {
      if (res.data) {
        this.props.updateAuth();
        this.props.history.push(`/users/${ res.data.id }`)
      } else {
        this.setState({
          error: true
        })
      }
    })
  }

  handleChange(e) {
    let target = e.target;
    this.setState({
      [target.name]: target.value
    })
  }

  render() {
    return (
      <div className="login">
        <div className="login-container row">
          <h4>Registrarse</h4>
          <form className="col s12" onSubmit={ this.handleSubmit.bind(this) }>
            <div className="row">
              <div className="input-field col s12">
                <input id="email" type="email" className="validate" name="email"
                  onChange={ this.handleChange } />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <input id="password" type="password" className="validate" name = "password"
                  onChange={ this.handleChange } />
                  <label htmlFor="password">Contrasena</label>
                </div>
                {
                  this.state.error &&
                  <div className="input-field col s12">
                    <p className="error">Correo o contrasena equivocada.</p>
                  </div>
                }
            </div>
            <div className="row">
              <div className="input-field col s12">
                <button className="btn waves-effect waves-light" type="submit">
                  Enviar
                </button>
              </div>
            </div>
          </form>
          {/* <div className="col s12">
            <p>or</p>
          </div>
          <div className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <button className="btn waves-effect waves-light" type="submit">
                  <a href="http://localhost:8080/auth/google/callback">Sign in with Google</a>
                </button>
              </div>
            </div>
            <a href="http://localhost:8080/auth/facebook/callback">Sign in with Facebook</a>
            <div className="row">
              <div className="input-field col s12">
                <button className="btn waves-effect waves-light" type="submit">
                  Sign in with Facebook
                </button>
              </div>
            </div>
          </div> */}
          <Link to="/account/register">No tienes una cuenta? Registrate</Link>
        </div>
      </div>
    );
  }
}

export default Login;
