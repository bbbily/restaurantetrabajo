import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {

  render() {
    return (
      <div>
        <nav className="nav">
          <div className="nav-wrapper">
            <a href="#" className="brand-logo center">Logo</a>
            <ul id="nav-mobile" className="left">
              <li><Link to="/">Jobs</Link></li>
              <li><Link to="/addjob">发布工作</Link></li>
            </ul>
            <a href="#" className="right hide-on-med-and-down">Logo</a>
          </div>
        </nav>
      </div>
    );
  }
}

export default Nav;
