import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import '../componentsStyle/Register.css';

class Profile extends Component {
  handleSubmit(e) {
    e.preventDefault();
  }
  render() {
    return (
      <div className="register">
        <div className="register-container row">
          <h4>Create an Account</h4>
          <form className="col s12" onSubmit={ this.handleSubmit.bind(this) }>
              <div className="input-field col s12">
                <input id="email" type="email" className="validate" />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <input id="email" type="email" className="validate" />
                <label htmlFor="email">Re-type Email</label>
              </div>
              <div className="input-field col s12">
                <input id="password" type="password" className="validate" />
                <label htmlFor="password">Password</label>
              </div>
              <div className="input-field col s12">
                <button className="btn waves-effect waves-light" type="submit">
                  Submit
                </button>
              </div>
          </form>
          <div className="col s12">
            <p>or</p>
          </div>
          <div className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <button className="btn waves-effect waves-light" type="submit">
                  Sign in with Google
                </button>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <button className="btn waves-effect waves-light" type="submit">
                  Sign in with Facebook
                </button>
              </div>
            </div>
          </div>
          <Link to="/account/register">Don't have an account? Sign up here</Link>
        </div>
      </div>
    );
  }
}

export default Profile;
