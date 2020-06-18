import React, { Component } from "react";

class editActivities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "date": '',
            "title": "",
            "description": '',
            "maps": '',
            activities: [],
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
        const id = this.state.activities.id;
        const { title, description, maps, date } = this.state;
        const url = `/api/activities/${id}`;
        const key = localStorage.getItem('token')
        const activities = {}
        activities.date = this.formatDate(date)
        activities.title = title
        activities.description = description
        activities.maps = maps

        fetch(url, {
            method: "PUT",
            body: JSON.stringify(activities),
            headers: { 'Content-type': 'application/json', Authorization: key }
        })
          .then(response => response && window.location.replace('/admin/activities'))
          .catch(function (error) {
            console.log(error);
          });
    }


    getData() {
        console.log("getData");
        const id = this.props.match.params.id;
        const url = `/api/activities/${id}`;
        fetch(url, {
            method: "GET",
            headers: { "Content-type": "application/json" },
        })
            .then((response) => response.json())
            .then((data) => this.setState({
                activities: data[0],
                date: data[0].date,
                title: data[0].title,
                description: data[0].description,
                maps: data[0].maps
            })
            )
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount(){
        this.getData()
    }

    formatDate(date) {
      const d = new Date(date);
      const month = d.getMonth() < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
      const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
      return `${d.getFullYear()}-${month}-${day}`;
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
                        value={this.formatDate(date)}
                        onChange={this.changeHandler}
                    />
                    <input className="mt-3 p-2" type="submit" name="submit" />
                </form>
            </div>
        )
    }
}

export default editActivities;
