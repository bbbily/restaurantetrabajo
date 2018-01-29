import React, { Component } from 'react';
import Main from './components/Main';
import Nav from './components/Nav';
import Footer from './components/Footer';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      email: ''
    }
  }
  componentWillMount() {
    this.updateAuth();
  }

  updateAuth() {
    let url = '/api/me';
    axios({
      method: 'get',
      url: url
    }).then(res => {
      if (res.data) {
        this.setState({
          id: res.data.id,
          email: res.data.email
        })
      } else {
        this.setState({
          id: '',
          email: ''
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Nav updateAuth={ this.updateAuth.bind(this) }
          email={ this.state.email } id={ this.state.id } />
        <Main updateAuth={ this.updateAuth.bind(this) } />
        <Footer />
      </div>
    );
  }
}

export default App;
