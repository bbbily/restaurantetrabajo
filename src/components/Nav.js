import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { Dropdown } from 'react-materialize';
import '../componentsStyle/Nav.css';

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      isAuthed: false,
      email: ''
    }
  }

  logOut() {
    let url = '/api/logOut';
    axios({
      method: 'get',
      url: url
    }).then(res => {
      this.props.updateAuth();
    })
  }

  render() {
    const memberLink = (
      <li>
        <Dropdown options={ ({ hover: true, belowOrigin: true }) }
          trigger={ <a>{ this.props.email }</a> }>
      	<Link to={ `/users/${ this.props.id }` }>Actualizar</Link>
      	<Link onClick={ this.logOut.bind(this) } to='/' >Cerrar Sesión</Link>
      </Dropdown>
      </li>
    )
    const guestLink = (
      <li className="hide-on-small-and-down">
        <Link to="/account/login">Registrarse(登录)</Link>
      </li>
    )
    return (
      <div>
        <nav className="nav">
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo center hide-on-med-and-down">Restaurante Trabajo</Link>
            <ul id="nav-mobile" className="left">
              <li><Link to="/">Trabajos</Link></li>
              <li><Link to="/addjob">发布餐馆工作</Link></li>
              {
                this.props.email ? memberLink : guestLink
              }
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
