import React from 'react';
// Components
import DayPlanning from '../components/Planning/DayPlanning';

export default class Agenda extends React.Component {

  constructor() {
    super();

    this.state = {
      dates: []
    }
  }

  componentDidMount() {
    fetch(`/api/activities/dates`, {
      method: "GET",
    })
      .then(response => response.json())
      .then((date) => this.setState({ dates: date }));
  }

  day_of_the_month(d) {
    return (d.getDate() < 10 ? '0' : '') + d.getDate();
  }

  month(d){
    const correct_month = d.getMonth() + 1
    return (correct_month < 10 ? '0' : '') + correct_month;
  }

  getDate(props) {
    const d = new Date(props)
    return d.getFullYear()+'-'+this.month(d)+'-'+this.day_of_the_month(d)
  }

  render() {
    return (
      <div className="container py-4 lg:py-10">
        <div className="px-2">
          <h1 className="text-4xl">Agenda/planning</h1>
        </div>
        { 
          this.state.dates.map(date => 
            <DayPlanning date={this.getDate(date)} key={date} />
          )
        }
      </div>
    );
  }
}