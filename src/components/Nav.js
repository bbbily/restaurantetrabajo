import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../componentsStyle/Nav.css';

class Nav extends Component {

  render() {
    return (
      <div>
        <nav className="nav">
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo center hide-on-med-and-down">Restaurante Trabajo</Link>
            <ul id="nav-mobile" className="left">
              <li><Link to="/">Trabajos</Link></li>
              <li><Link to="/addjob">发布餐馆工作</Link></li>
            </ul>
            {/* <Link to="/account/login" className="right">Sign In</Link> */}
            <div className="right information hide-on-small-and-down">
              <p>llama al 615-668-9287 para obtener más información</p>
              <p>拨打615-668-9287咨询或登记工作</p>
            </div>
            <p className="right hide-on-med-and-up">Telefono: 615-668-9287</p>
          </div>
        </nav>
      </div>
    );
  }
}

export default Nav;
