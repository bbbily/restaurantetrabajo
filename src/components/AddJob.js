import React, { Component } from 'react';
import { Input } from 'react-materialize';
import axios from 'axios';
import '../componentsStyle/AddJob.css';

class AddJob extends Component {
  constructor() {
    super();
    this.state = {
      avoidBot: '',
      jobTitle: 'freidora',
      experience: 'todas',
      salary: '',
      companyName: '',
      companyType: 'buffet',
      phone: '',
      street: '',
      city: '',
      state: 'al',
      zipcode: '',
      freeHousing: 'si',
      description: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    this.setState({
      [target.name]: target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.avoidBot === '') {
      let date = new Date();
      let url = 'http://localhost:8080/api/job';
      let salary = Number(this.state.salary);
      let postDate = `${ date.getMonth() + 1 }/${ date.getDate() }/${ date.getFullYear() }`
      let data = { ...this.state, salary: salary, postDate: postDate };
      axios({
        method: 'post',
        url: url,
        data: data
      }).then(res => {
        console.log(res)
      })
    }
  }

  static defaultProps = {
    jobTitleOption: {
      'freidora': '油锅(Fryer)',
      'ayudante de cocina': '打杂(Kitchen Helper)',
      'lavaplatos': '洗碗(Dishwasher)',
      'anfitriona': '带位(Host)',
      'segundo cocinero': '帮炒(Second Cooker)',
      'cocinero': '炒锅师傅(Cooker)',
      'corredor de comida': '传菜员／看台(Food Runner)',
      'chef de sushi': '寿司师傅(Sushi Chef)',
      'ayudante de sushi': '寿司助手(Sushi Helper)',
      'conductor de entrega': '送餐(Dilivery Driver)',
      'chef hibachi': '铁板师傅(Hibachi Chef)',
      'servidor': '服务员(Server)',
      'busser': '收碗收桌子(Busser)',
      'cajero': '收银(Cashier)',
      'gerente': '经理(Manager)'
    },
    experienceOption: {
      'todas': '不限(Any)',
      'no experiencia': '无经验(No Experience)',
      '0-1 ano': '0-1年(0-1year)',
      '1-3 anos': '1-3年(1-3years)',
      'mas de 3 anos': '3年以上(3years+)'
    },
    restaurantTypeOption: {
      'buffet': '自助(Buffet)',
      'comida': '堂吃(Dining)',
      'llevar a cabo': '外卖(Carry Out)',
      'comida rapida': '快餐(Fast Food)'
    }
  }

  render() {
    let jobTitleOption = this.props.jobTitleOption;
    let experienceOption = this.props.experienceOption;
    let restaurantTypeOption = this.props.restaurantTypeOption;
    let jobTitleOptions = Object.keys(jobTitleOption).map(key => (
      <option key={ key } value={ key }>{ jobTitleOption[key] }</option>
    ))
    let experienceOptions = Object.keys(experienceOption).map(key => (
      <option key={ key } value={ key }>{ experienceOption[key] }</option>
    ))
    let restaurantTypeOptions = Object.keys(restaurantTypeOption).map(key => (
      <option key={ key } value={ key }>{ restaurantTypeOption[key] }</option>
    ))
    return (
      <div className="row">
        <form className="col s12 add-job-form" onSubmit={ this.handleSubmit.bind(this) }>
          <input type="text" name="avoidBot" onChange={ this.handleChange }
            className="best-name" />
          <h4 className="form-job-heading">发布职位信息Job Information：</h4>
          <div className="row">
              <Input label="工作职位Job Title：" type="select" s={12} m={6} l={4} name="jobTitle"
                value={ this.state.jobTitle } onChange={ this.handleChange }>
                { jobTitleOptions }
              </Input>
              <Input label="工作经验要求Experience：" type="select" s={12} m={6} l={4} name="experience"
                value={ this.state.experience } onChange={ this.handleChange }>
                { experienceOptions }
              </Input>
            <div className="input-field col s12 m6 l4">
              <input name="salary" onChange={ this.handleChange } type="text"
                value={ this.state.salary } className="validate" />
              <label htmlFor="salary">月工资Salary/Monthly：(例2000或面议)</label>
            </div>
            <div className="input-field col s12">
              <textarea id="textarea1" name="description" className="materialize-textarea"
                value={ this.state.description } onChange={ this.handleChange }>
              </textarea>
              <label htmlFor="textarea1">工作职位描述(Job Description)：(可不填)</label>
            </div>
          </div>
          <h4>餐馆信息Restaurant Information：</h4>
          <div className="row">
            <div className="input-field col s12 m6 l4">
              <input name="companyName" type="text" className="validate" />
              <label>餐馆名称Restaurant Name：</label>
            </div>
            <Input label="餐馆类型Restaurant Type：" type="select" s={12} m={6} l={4} name="companyType"
              onChange={ this.handleChange } value={ this.state.companyType }>
              { restaurantTypeOptions }
            </Input>
            <Input label="包吃住Free Housing：" s={12} m={6} l={4} type="select" onChange={ this.handleChange }
              value={ this.state.freeHousing } name="freeHousing">
              <option value="si">是(Yes)</option>
              <option value="no">否(No)</option>
            </Input>
            <div className="input-field col s12 m6">
              <input type="text" className="validate" onChange={ this.handleChange }
                name="street" value={ this.state.street } />
              <label>餐馆地址Restaurant Address：(可不填)</label>
            </div>
            <div className="input-field col s12 m6 l4">
              <input name="phone" onChange={ this.handleChange }
                value={ this.state.phone } type="tel"
                className="validate" />
              <label>联系电话Phone Number：(例6156689287，必填)</label>
            </div>
            <div className="input-field col s12 m6 l4">
              <input type="text" className="validate" onChange={ this.handleChange }
                name="city" value={ this.state.city } />
              <label>城市City：</label>
            </div>
            <Input label="州State：" s={12} m={6} l={4} type="select" onChange={ this.handleChange }
              value={ this.state.state } name="state">
              <option value="al">AL</option>
              <option value="ak">AK</option>
              <option value="ar">AR</option>
              <option value="az">AZ</option>
              <option value="ca">CA</option>
              <option value="co">CO</option>
              <option value="ct">CT</option>
              <option value="dc">DC</option>
              <option value="de">DE</option>
              <option value="fl">FL</option>
              <option value="ga">GA</option>
              <option value="hi">HI</option>
              <option value="ia">IA</option>
              <option value="id">ID</option>
              <option value="il">IL</option>
              <option value="in">IN</option>
              <option value="ks">KS</option>
              <option value="ky">KY</option>
              <option value="la">LA</option>
              <option value="ma">MA</option>
              <option value="md">MD</option>
              <option value="me">ME</option>
              <option value="mi">MI</option>
              <option value="mn">MN</option>
              <option value="mo">MO</option>
              <option value="ms">MS</option>
              <option value="mt">MT</option>
              <option value="nc">NC</option>
              <option value="ne">NE</option>
              <option value="nh">NH</option>
              <option value="nj">NJ</option>
              <option value="nm">NM</option>
              <option value="nv">NV</option>
              <option value="ny">NY</option>
              <option value="nd">ND</option>
              <option value="oh">OH</option>
              <option value="ok">OK</option>
              <option value="or">OR</option>
              <option value="pa">PA</option>
              <option value="ri">RI</option>
              <option value="sc">SC</option>
              <option value="sd">SD</option>
              <option value="tn">TN</option>
              <option value="tx">TX</option>
              <option value="ut">UT</option>
              <option value="vt">VT</option>
              <option value="va">VA</option>
              <option value="wa">WA</option>
              <option value="wi">WI</option>
              <option value="wv">WV</option>
              <option value="wy">WY</option>
            </Input>
            <div className="input-field col s12 m6 l4">
              <input type="text" className="validate" onChange={ this.handleChange }
                name="zipcode" value={ this.state.zipcode } />
              <label>邮编Zip Code：</label>
            </div>
          </div>
          <div className="input-field col s12 m6 l4">
            <button className="btn waves-effect waves-light" type="submit">发布(Send)
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddJob;
