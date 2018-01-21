import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../componentsStyle/Nav.css';

class Thankyou extends Component {

  render() {
    return (
      <div className="row">
        <div className="input-field col s12 center">
          <h5>Gracias! Hemos recibido tu solicitud!</h5>
          <h5>工作发布成功！(You have posted the job!)</h5>
          <Link to="/">espalda 返回主页(Back to home page)</Link>
        </div>
      </div>
    );
  }
}

export default Thankyou;
