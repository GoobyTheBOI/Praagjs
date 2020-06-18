import React, { Component } from 'react';

class ContactPage extends Component {

  constructor() {
    super();

    this.state = {
      contacts: []
    }
  }

  componentDidMount() {
    fetch('/api/contacts', {
      method: "GET"
    })
      .then(response => response.json())
      .then((contacts) => this.setState({ contacts: contacts }));
  }

  render() {
    return (
      <div className="container py-4 lg:py-10">
        <div className="px-2">
          <h1 className="text-4xl">Contactgegevens</h1>
        </div>
        <div className="flex flex-wrap">
          {
            this.state.contacts.map(contact => (
              <div className="p-2 w-full sm:w-1/2 md:w-4/12 lg:w-3/12" key={contact.id}>
                <div className="py-4 px-4 shadow-lg border border-gray-300 rounded-md">
                  <div className="font-bold text-base text-gray-700">{contact.firstname} {contact.lastname}</div>
                  <p className="text-gray-700 text-xs">
                    {contact.phone}
                  </p>
                  <p className="text-gray-700 text-xs">
                    {contact.email}
                  </p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default ContactPage;