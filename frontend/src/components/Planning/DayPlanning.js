import React from 'react';
import { Link } from 'react-router-dom';
// assets
import gps from '../../assets/img/gps.svg';

export default class DayOne extends React.Component {

  constructor() {
    super();

    this.state = {
      activities: []
    }
  }

  componentDidMount() {
    fetch(`/api/activities/${this.props.date}`, {
      method: "GET",
    })
      .then(response => response.json())
      .then((activities) => this.setState({ activities: activities }));
  }

  planningDag() {
    try {
      return <div className="flex flex-wrap">
        {
          this.state.activities.map(activity => (
            <div className="p-2 w-full sm:w-1/2 md:w-3/12" key={activity.id}>
              <div className="py-4 px-4 shadow-lg border border-gray-300 rounded-md flex justify-between">
                <div>
                  <div className="font-bold text-base text-gray-700">{activity.title}</div>
                  <p className="text-gray-700 text-xs">
                    {activity.description}
                  </p>
                  <p className="text-gray-700 text-xs">
                    {activity.date}
                  </p>
                </div>
                {activity.maps ? <Link to={`/map/${activity.maps}`} className="flex h-10 w-10 border-2 border-purple-700 cursor-pointer hover:border-purple-800 rounded"><img src={gps} alt={gps} className="m-auto h-6 w-6"/></Link> : ''}
              </div>
            </div>
          ))
        }
      </div>;
    } catch (e) {
      return <p className="px-2">Niks gepland vandaag!</p>
    }
  }

  getDateFormat(date) {
    const d = new Date(date)
    const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' })
    const [{ value: mo }, , { value: da }, , { value: ye }] = dtf.formatToParts(d)

    return `${da} ${mo} ${ye}`;
  }

  render() {
    return (
      <div className="py-4 lg:py-5">
        <div className="px-2">
          <h1 className="text-2xl">{this.getDateFormat(this.props.date)}</h1>
        </div>
        { this.planningDag() }
      </div>
    );
  }
}