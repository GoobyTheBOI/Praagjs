import React, { Component } from "react";
import { Redirect } from 'react-router'



class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "email": "",
      "password": "",
      "redirect": false,
    };

    this.changeHandler = this.changeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }

  submitHandler = (e) => {
    this.fetchData()
    e.preventDefault();
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  fetchData() {
    const url = "/api/login";
    const { email, password} = this.state;
    const user = {}
    user.email = email
    user.password = password

    fetch(url, {
      method: "POST",
      body: JSON.stringify(user),
      headers: { 'Content-type': 'application/json' }
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.token) {
          localStorage.setItem('token', data.token)
          this.setState({ redirect: true })
        } else {
          window.location.reload();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  render() {
    const { email, password, redirect } = this.state;

    if (redirect) {
      return <Redirect to='/admin/activities' />;
    }
    return (
      <div className="container mx-auto">
        <form className="flex flex-col p-4" onSubmit={this.submitHandler}>
          <label className="p-2 pl-0" htmlFor="email">Email</label>
          <input
          className="border border-gray-500 p-1 rounde"
            type="email"
            name="email"
            value={email}
            onChange={this.changeHandler}
          />
          <label className="p-2 pl-0" htmlFor="email">Wachtwoord</label>
          <input
          className="border border-gray-500 p-1 rounde"
            type="password"
            name="password"
            value={password}
            onChange={this.changeHandler}
          />
          <input className="mt-3 p-2" type="submit" name="submit" />
        </form>
      </div>
    );
  }
}

export default Login