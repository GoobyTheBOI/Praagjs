import React, {Component} from 'react';
import Nav from "../nav/nav";
import { Redirect } from 'react-router'

const title = "Contacts";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: []
    };

    // this.delete = this.delete.bind(this)
  }

  authentication() {
    const key = localStorage.getItem("token");

    if (!key) {
      return <Redirect to="/admin/login" />;
    }
  }

  fetchData() {
    console.log("Fecth");
    const url = "/api/contacts";
    fetch(url, {
      method: "GET",
      headers: { "Content-type": "application/json"},
    })
      .then((response) => response.json())
      .then((data) => this.setState({ contacts: data }))
      .catch(function (error) {
        console.log(error);
      });
  }

  delete(id){
    const url = `/api/contacts/${id}`;
    const key = localStorage.getItem("token");
    fetch(url, {
      method: "DELETE",
      headers: { "Content-type": "application/json", Authorization: key },
    })
      .then((response) => response && window.location.reload())
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const contacts = this.state;
    return (
      <div>
        <Nav title={title} />
          {this.authentication()}
          {contacts.contacts.map((contact) => {
            return (
              <div key={contact.id}>
                <div className="border px-4 py-2 w-1/3 inline-flex">
                  Name: {contact.firstname}
                </div>
                <div className="border px-4 py-2 w-1/3 inline-flex">
                  Lastname: {contact.lastname}
                </div>
                <div className="border px-4 py-2 w-1/3 inline-flex">
                  Phone: {contact.phone}
                </div>
                <div className="border px-4 py-2 w-1/3 inline-flex">
                  Email: {contact.email}
                </div>
                <a href={`/admin/contacts/edit/${contact.id}`} className="inline-flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5">
                  Edit
                </a>
                <button onClick={() => this.delete(contact.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5 inline-flex">
                  Delete
                </button>
              </div>
            );
          })}
      </div>
    );
  }
}

export default Contact