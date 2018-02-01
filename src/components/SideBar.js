import React, { Component } from 'react';
import '../componentsStyle/SideBar.css'

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salary: props.stateObj.salary,
      company_type: props.stateObj.company_type,
      experience: props.stateObj.experience
    }
  }

  static defaultProps = {
    listItems: [
      {
        name: 'Salario(Mensual)',
        key: 'salary',
        items: [
          {
            text: 'Todas salario',
            value: ''
          },
          {
            text: '$0 - $999',
            value: '1, 999'
          },
          {
            text: '$1000 - $1999',
            value: '1000, 1999'
          },
          {
            text: '$2000 - $2999',
            value: '2000, 2999'
          },
          {
            text: '$3000+',
            value: '3000, 999999'
          }
        ]
      },
      {
        name: 'Typo de restaurante',
        key: 'company_type',
        items: [
          {
            text: 'Todas restaurante',
            value: ''
          },
          {
            text: 'Comida',
            value: 'comida'
          },
          {
            text: 'Buffet',
            value: 'buffet'
          },
          {
            text: 'Llevar a cabo',
            value: 'llevar a cabo'
          },
          {
            text: 'Comida rapida',
            value: 'comida rapida'
          }
        ]
      },
      {
        name: 'Nivel de experiencia',
        key: 'experience',
        items: [
          {
            text: 'Todas experiencia',
            value: ''
          },
          {
            text: 'No experiencia',
            value: 'no experiencia'
          },
          {
            text: '0-1 ano',
            value: '0-1 ano'
          },
          {
            text: '1-3 anos',
            value: '1-3 anos'
          },
          {
            text: '3 anos+',
            value: 'mas de 3 anos'
          }
        ]
      },
    ]
  }

  handleClick(key, value) {
    let query = this.props.location.search;
    if (query.includes(key)) {
      let queryArr = [];
      query.replace('?', '').split('&').forEach(str => {
        let arr = str.split('=');
        if (value !== '' && value !== 0 && arr[0] === key) {
          arr[1] = value;
          queryArr.push(arr.join('='));
        } else if (arr[0] !== key) {
          queryArr.push(arr.join('='));
        }
      })
      if (queryArr.length > 0) {
        query = '?' + queryArr.join('&');
      } else {
        query = '';
      }
    } else if (!query.includes(key) && query !== '' && value !== '' && value !== 0) {
      query += `&${ key }=${ value }`;
    } else if (!query.includes(key) && query === '' && value !== '' && value !== 0) {
      query += `?${ key }=${ value }`;
    }

    this.props.history.push({
      search: query
    })
    this.props.location.search = query;
    this.props.handleClick(key, value);
  }

  render() {
    let listItems = [];
    this.props.listItems.forEach(listItem => {
      listItems.push(
        <li key={ listItem.name }>
          <p>{ listItem.name }</p>
          <ul className="category">{listItem.items.map(item => {
            return (
              <li key={ item.value }>
                <a className={ `waves-effect ${ this.props.stateObj[listItem.key] == item.value ? 'is-active' : '' }` }
                  onClick={ this.handleClick.bind(this, listItem.key, item.value) }>
                  { item.text }
                </a>
              </li>
            )})}
          </ul>
        </li>
      )
      listItems.push(<li className="divider" key={`${ listItem.key }divider`}></li>)
    });

    return (
      <div className="side-bar">
        <p>{ `${ this.props.stateObj.title.charAt(0).toUpperCase() + this.props.stateObj.title.slice(1) } trabajos ` + (this.props.state ? `en ${ this.props.state }` : '')}</p>
        <ul className="category-list">
          { listItems }
        </ul>
      </div>
    );
  }
}

export default SideBar;
