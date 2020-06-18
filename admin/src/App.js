import React, {Component} from 'react';
import './App.css';

import Menu from './components/menu/menu'
import Contact from './components/contacts/contacts';
import Activities from './components/activities/activities';
import LoginForm from './components/form/login';
import ContactForm from './components/form/addContactForm';
import editContact from './components/form/editContactForm';
import ActivitiesForm from './components/form/addActivitiesForm';
import editActivities from './components/form/editActivitiesForm';
import { Redirect } from 'react-router'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
class App extends Component {
  authentication(){
    const key = localStorage.getItem('token')

    if(!key){
      return <Redirect to="/admin/login" />
    }
  }
  
  render() {
    return (
        <Router>
          <Menu />
            {this.authentication()}
            <Route exact path="/admin/contacts" component={Contact} />
            <Route path="/admin/contacts/edit/:id" component={editContact} />
            <Route path="/admin/contacts/add" component={ContactForm} />
            <Route exact path="/admin/activities" component={Activities} />
            <Route path="/admin/activities/add" component={ActivitiesForm} />
            <Route path="/admin/activities/edit/:id" component={editActivities} />
            <Route path="/admin/login" component={LoginForm} />
        </Router>
    );
  }
}

export default App;
