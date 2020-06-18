import React, {Component} from 'react';
import './menu.style.css';

import {Link} from 'react-router-dom'
import { Redirect } from 'react-router'


class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('token')
    }
  }

  logout(e) {
    e.preventDefault();
    localStorage.clear();
    return window.location.replace('/admin/login');
  } 

  render(){
    return (
      <div className="float-left h-screen">
        <div className="menu-background">
          <div className="flex justify-center items-center p-4">
            <h1 className="text-4xl text-white">Praagjs</h1>
          </div>
          <ul className="flex flex-col items-center">
            <Link to="/admin/contacts">
              <li className="text-white text-lg">Contacten</li>
            </Link>
            <Link to="/admin/activities">
              <li className="text-white pt-1 text-lg">Activiteiten</li>
            </Link>
            { this.state.token ? <li className="text-white pt-1 text-lg cursor-pointer" onClick={e => this.logout(e)}>Uitloggen</li> : ''}
          </ul>
        </div>
      </div>
    );
  }
}

export default Menu