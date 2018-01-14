import React, { Component } from 'react';
import Autocomplete from './Autocomplete';
import { Link } from 'react-router-dom';
import '../componentsStyle/JobsTable.css';

class JobsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      state: props.state
    }
  }
  //
  // componentWillMount() {
  //   let query = this.props.location.search.replace('?', '').split('&');
  //   let obj = {};
  //   query.forEach(str => {
  //     let arr = str.split('=');
  //     obj[arr[0]] = arr[1].replace(/%20/, ' ');
  //   })
  //   this.setState(obj);
  // }

  handleSubmit(e) {
    e.preventDefault();
    let query = '';
    if (this.state.title) {
      query += `?title=${ this.state.title }`;
      if (this.state.state) {
        query += `&state=${ this.state.state }`;
      }
    } else {
      if (this.state.state) {
        query += `?state=${ this.state.state }`;
      }
    }
    this.props.history.push({
      search: query
    })
    this.props.location.search = query;
    this.props.handleSubmit(this.state);
  }

  handleChange(title, e) {
    this.setState({
      [title]: e.target.value
    })
  }

  handleAutocomplete(title, value) {
    this.setState({
      [title]: value
    })
  }

  static defaultProps = {
    titleDefaultData: {
      'freidora': null,
      'ayudante de cocina': null,
      'lavaplatos': null,
      'anfitriona': null,
      'segundo cocinero': null,
      'cocinero': null,
      'corredor de comida': null,
      'chef de sushi': null,
      'ayudante de sushi': null,
      'conductor de entrega': null,
      'chef hibachi': null,
      'servidor': null,
      'busser': null,
      'cajero': null
    },
    stateDefaultData:  {
      AL: null, AK: null, AR: null, AZ: null, CA: null, CO: null,
      CT: null, DC: null, DE: null, FL: null, GA: null, HI: null, IA: null, ID: null,
      IL: null, IN: null, KS: null, KY: null, LA: null, MA: null, MD: null, ME: null,
      MI: null, MN: null, MO: null, MS: null, MT: null, NC: null, NE: null, NH: null,
      NJ: null, NM: null, NV: null, NY: null, ND: null, OH: null, OK: null, OR: null,
      PA: null, RI: null, SC: null, SD: null, TN: null, TX: null, UT: null, VT: null,
      VA: null, WA: null, WI: null, WV: null, WY: null
    }
  }

  render() {
    let jobs = [];
    if (this.props.jobs) {
      this.props.jobs.forEach(job => {
        jobs.push(
          <ul className="table-content" key={ job.id }>
            <li><Link to={ `/jobs/${ job.id }` }>{ job.title.charAt(0).toUpperCase() + job.title.slice(1) }</Link></li>
            <li><p>{ job.company_type.charAt(0).toUpperCase() + job.company_type.slice(1) }</p></li>
            <li><p>{ job.salary || 'Negociable' }</p></li>
            <li><p>{ job.experience.charAt(0).toUpperCase() + job.experience.slice(1) }</p></li>
            <li><p>{ job.state.toUpperCase() }</p></li>
            <li><p>{ job.phone }</p></li>
            <li><p>{ job.free_housing.charAt(0).toUpperCase() + job.free_housing.slice(1) }</p></li>
            <li><p>{ job.post_date }</p></li>
          </ul>
        );
        jobs.push(
          <div className="table-content-detail" key={`detail${ job.id }`}>
            <p>{ job.description }</p>
            <a className="waves-effect waves-light btn">Apply</a>
          </div>
        );
      })
    }
    return (
      <div className="jobs-table">
        <form onSubmit={ this.handleSubmit.bind(this) }>
          <div className="row">
            <Autocomplete value={ this.state.title } title="titulo(freidora,corredor de comida): separar por ','"
              onAutocomplete={ this.handleAutocomplete.bind(this, 'title') }
              onChange={ this.handleChange.bind(this, 'title') }
              data={ this.props.titleDefaultData } />
            <Autocomplete value={ this.state.state } title="estado(oh, ut): separar por ','"
              onAutocomplete={ this.handleAutocomplete.bind(this, 'state') }
              onChange={ this.handleChange.bind(this, 'state') }
              data={ this.props.stateDefaultData } />
            <div className="input-field col s12 l2">
              <button className="btn waves-effect waves-light" type="submit">Submit
              </button>
            </div>
          </div>
        </form>
        <div className="jobs-table-container">
          <ul className="table-title">
            <li><p>Título profesional</p></li>
            <li><p>Typo de restaurante</p></li>
            <li><p>Salario</p></li>
            <li><p>Experiencia</p></li>
            <li><p>Estado</p></li>
            <li><p>Numero de contacto</p></li>
            <li><p>Vivienda libre</p></li>
            <li><p>Fecha posterior</p></li>
          </ul>
          { jobs }
        </div>
      </div>
    );
  }
}

export default JobsTable;
