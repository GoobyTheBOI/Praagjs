import React, {Component} from "react";
import Nav from '../nav/nav';
import { Redirect } from 'react-router'

const title = "Activities";

class Activitie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      delete: [],
    };
  }

  authentication() {
    const key = localStorage.getItem('token')

    if (!key) {
      return <Redirect to="/admin/login" />
    }
  }

  fetchData() {
    console.log("Fecth");
    const url = "/api/activities";
    fetch(url, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => this.setState({ activities: data }))
      .catch(function (error) {
        console.log(error);
      });
  }

  delete(id) {
    const url = `/api/activities/${id}`;
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

  day_of_the_month(d) {
    return (d.getDate() < 10 ? '0' : '') + d.getDate();
  }

  month(d){
    const correct_month = d.getMonth() + 1
    return (correct_month < 10 ? '0' : '') + correct_month;
  }

  componentDidMount() {
    this.fetchData();
  }
  render() {
    const activities = this.state

    return (
      <div>
        {this.authentication()}
        <Nav title={title} />

        {activities.activities.map((activitie) => {
          const d = new Date(activitie.date)
          
          const full_year = d.getFullYear()+'-'+this.month(d)+'-'+this.day_of_the_month(d)

          return (
            <div key={activitie.id}>
              <div className="border px-4 py-2 w-1/3 inline-flex">
                Title: {activitie.title}
              </div>
              <div className="border px-4 py-2 w-1/3 inline-flex">
                Description: {activitie.description}
              </div>
              <div className="border px-4 py-2 w-1/3 inline-flex">
                Maps: {activitie.maps}
              </div>
              <a href={`/admin/activities/edit/${activitie.id}`} className="inline-flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5">
                Edit
              </a>
              <button onClick={() => this.delete(activitie.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5 inline-flex">
                Delete
              </button>
            </div>
          );
        })}
      </div>
    )
  }
}

export default Activitie;
