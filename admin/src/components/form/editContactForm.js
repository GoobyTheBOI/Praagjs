import React, { Component } from "react";

class editContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      contacts: [],
    };
    

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  submitHandler = (e) => {
    this.fetchData();
    e.preventDefault();
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };



  fetchData() {
    const id = this.props.match.params.id;
    const url = `/api/contacts/${id}`;
    const key = localStorage.getItem("token");
    const { firstname, lastname, phone, email } = this.state;
    const contact = {};
    contact.firstname = firstname;
    contact.lastname = lastname;
    contact.phone = phone;
    contact.email = email;

    fetch(url, {
      method: "PUT",
      body: JSON.stringify(contact),
      headers: { "Content-type": "application/json", Authorization: key },
    })
    .then(response => response && window.location.replace('/admin/contacts'))
    .catch(function (error) {
      console.log(error);
    });
  }

  getData() {
    console.log("getData");
    const id = this.props.match.params.id;
    const url = `/api/contacts/${id}`;
    fetch(url, {
      method: "GET",
      headers: { "Content-type": "application/json"},
    })
      .then((response) => response.json())
      .then((data) => this.setState({
        firstname: data.firstname,
        lastname: data.lastname,
        phone: data.phone,
        email: data.email
      }))
      .catch(function (error) {
        console.log(error);
      });



      
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const { firstname, lastname, phone, email } = this.state;
    return (
      <div className="container mx-auto">
        <form className="flex flex-col p-4" onSubmit={this.submitHandler}>
          <label className="p-2 pl-0" htmlFor="firstname">firstname</label>
          <input
            className="border border-gray-500 p-1 rounded"
            type="text"
            name="firstname"
            value={firstname}
            onChange={this.changeHandler}
          />
          <label className="p-2 pl-0" htmlFor="lastname">lastname</label>
          <input
            className="border border-gray-500 p-1 rounded"
            type="text"
            name="lastname"
            value={lastname}
            onChange={this.changeHandler}
          />
          <label className="p-2 pl-0" htmlFor="phone">phone</label>
          <input
            className="border border-gray-500 p-1 rounded"
            type="text"
            name="phone"
            value={phone}
            onChange={this.changeHandler}
          />
          <label className="p-2 pl-0" htmlFor="email">email</label>
          <input
            className="border border-gray-500 p-1 rounded"
            type="email"
            name="email"
            value={email}
            onChange={this.changeHandler}
          />
          <input className="mt-3 p-2" type="submit" name="submit" />
        </form>
      </div>
    );
  }
}

export default editContact;
