import React, { Component } from "react";



class ActivitiesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "date": '',
            "title": "",
            "description": '',
            "maps": '',
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
        const url = "/api/activities";
        const key = localStorage.getItem('token')
        const { title, description, maps, date } = this.state;
        const activities = {}
        activities.date = date
        activities.title = title
        activities.description = description
        activities.maps = maps



        fetch(url, {
            method: "POST",
            body: JSON.stringify(activities),
            headers: { 'Content-type': 'application/json', Authorization: key }
        })
        .then(response => response && window.location.replace('/admin/activities'))
        .catch(function (error) {
            console.log(error);
        });
    }
    render() {
        const { title, description, maps, date } = this.state;
        return (
            <div className="container mx-auto">
                <form className="flex flex-col p-4" onSubmit={this.submitHandler}>
                    <label className="p-2 pl-0" htmlFor="title">Title</label>
                    <input
                        className="border border-gray-500 p-1 rounded"
                        type="text"
                        name="title"
                        value={title}
                        onChange={this.changeHandler}
                    />
                    
                    <label className="p-2 pl-0" htmlFor="description">description</label>
                    <input
                        className="border border-gray-500 p-1 rounded"
                        type="text"
                        name="description"
                        value={description}
                        onChange={this.changeHandler}
                    />
                    
                    <label className="p-2 pl-0" htmlFor="maps">map</label>
                    <input
                        className="border border-gray-500 p-1 rounded"
                        type="text"
                        name="maps"
                        value={maps}
                        onChange={this.changeHandler}
                    />
                    <label className="p-2 pl-0" htmlFor="date">Datum</label>
                    <input
                        className="border border-gray-500 p-1 rounded"
                        type="date"
                        name="date"
                        value={date}
                        onChange={this.changeHandler}
                    />
                    <input className="mt-3 p-2" type="submit" name="submit" />
                </form>
            </div>
        )
    }
}

export default ActivitiesForm