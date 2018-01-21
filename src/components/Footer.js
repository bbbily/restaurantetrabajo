import React, { Component } from 'react';
import '../componentsStyle/Footer.css';

class Footer extends Component {

  render() {
    return (
      <footer className="page-footer">
        <div className="footer-copyright">
          <div className="container">
            <p className="grey-text text-lighten-4">Restaurante Trabajo帮助你更好找工人 | 电话：615-668-9287</p>
            <p className="grey-text text-lighten-4">Restaurante Trabajo ayuda a conseguir trabajos | Telefono: 615-668-9287</p>
            <p>© 2018 <a href="http://www.restaurantetrabajo.com">www.restaurantetrabajo.com</a></p>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
