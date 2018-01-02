import React, { Component } from 'react';
import $ from 'jquery';
import Autocomplete from './Autocomplete';
import '../componentsStyle/JobsTable.css';

class JobsTable extends Component {
  constructor() {
    super();
    this.state = {
      jobTitle: '',
      state: ''
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state)
  }

  handleChange(title, e) {
    console.log(e.target.value)
    this.setState({
      [title]: e.target.value
    })
  }

  handleAutocomplete(title, value) {
    this.setState({
      [title]: value
    })
  }

  render() {

    let jobs = this.props.jobs.map(job => (
      <ul className="table-content" key={ job.id }>
        <li>{ job.title }</li>
        <li>{ job.company_type }</li>
        <li>{ job.experience }</li>
        <li>{ job.salary }</li>
        <li>{ job.state }</li>
        <li>{ job.phone }</li>
        <li>{ job.post_date }</li>
        <li>{ job.detail }</li>
      </ul>
    ))
    return (
      // <div>
      //   <table>
      //     <thead>
      //       <tr>
      //         <th>Job Title</th>
      //         <th>Job Type</th>
      //         <th>Experience Level</th>
      //         <th>Salary</th>
      //         <th>State</th>
      //         <th>Contact Number</th>
      //         <th>Post Date</th>
      //       </tr>
      //     </thead>
      //     <tbody>
      //       { jobs }
      //     </tbody>
      //   </table>
      // </div>
      <div>
        <div className="row">
          <form className="col s12" onSubmit={ this.handleSubmit.bind(this) }>
            <div className="row">
              <Autocomplete title="jobTitle" onAutocomplete={ this.handleAutocomplete.bind(this, 'jobTitle') } onChange={ this.handleChange.bind(this, 'jobTitle') } data={{ 'Apple': null, 'Google': null, 'alet': null }} />
              <Autocomplete title="state" onAutocomplete={ this.handleAutocomplete.bind(this, 'state') } onChange={ this.handleChange.bind(this, 'state') } data={{ 'Apple': null, 'Google': null, 'alet': null }} />
              <div className="input-field col s12 l2">
                <input type="submit" value="Find Jobs" />
              </div>
            </div>
          </form>
        </div>
        <div className="jobs-table">
          <ul>
            <li>Job Title</li>
            <li>Job Type</li>
            <li>Experience Level</li>
            <li>Salary</li>
            <li>State</li>
            <li>Contact Number</li>
            <li>Post Date</li>
          </ul>
          { jobs }
        </div>
      </div>
    );
  }
}

export default JobsTable;
