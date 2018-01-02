import React, { Component } from 'react';

class SideBar extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  static defaultProps = {
    listItems: [
      {
        name: 'Salary Estimate(Monthly)',
        items: [
          {
            text: '$1000',
            value: 1000
          },
          {
            text: '$2000',
            value: 2000
          },
          {
            text: '$3000',
            value: 3000
          }
        ]
      },
      {
        name: 'Job Type',
        items: [
          {
            text: 'Full-time',
            value: 'full'
          },
          {
            text: 'Part-time',
            value: 'part'
          },
          {
            text: 'Training',
            value: 'train'
          }
        ]
      },
      {
        name: 'Experience Level',
        items: [
          {
            text: 'Entry Level',
            value: 'entry'
          },
          {
            text: 'Mid level',
            value: 'mid'
          },
          {
            text: 'Senior Level',
            value: 'senior'
          }
        ]
      },
    ]
  }

  handleClick(value) {
    console.log(value)
  }

  render() {
    let listItems = this.props.listItems.map(listItem => (
      <li key={ listItem.name }>
        <p>{ listItem.name }</p>
        <ul>{listItem.items.map(item => {
          return (
            <li key={ item.value } onClick={ this.handleClick.bind(this, item.value) }>{ item.text }</li>
          )})}
        </ul>
      </li>
    ))
    return (
      <div>
        <p>{ `${ this.props.jobTitle } jobs in ${ this.props.state }` }</p>
        <ul>
          { listItems }
        </ul>
      </div>
    );
  }
}

export default SideBar;
