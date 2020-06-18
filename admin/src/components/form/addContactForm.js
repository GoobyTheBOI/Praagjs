import React, { Component } from "react";

class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "firstname": "",
            "lastname": "",
            "phone": "",
            "email": "",
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
        const url = "/api/contacts";
        const key = localStorage.getItem('token')
        const { firstname, lastname, phone, email } = this.state;
        const contact = {}
        contact.firstname = firstname
        contact.lastname = lastname
        contact.phone = phone
        contact.email = email


        fetch(url, {
            method: "POST",
            body: JSON.stringify(contact),
            headers: { 'Content-type': 'application/json', Authorization: key }
        })
        .then(response => response && window.location.replace('/admin/contacts'))
        .catch(function (error) {
            console.log(error);
        });
    }
    render(){
        const { firstname, lastname, phone, email } = this.state;
        return(
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
        )
    }
}

export default ContactForm