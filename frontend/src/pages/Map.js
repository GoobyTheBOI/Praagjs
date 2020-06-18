import React from 'react';
import { Link } from 'react-router-dom';
// Components
import MapC from '../components/Map/Map';
import Search from '../components/Input/Input';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchItem: 'Praag',
    };
    this.updateSearch = this.updateSearch.bind(this);
  }

  updateSearch(e) {
    this.setState({ searchItem: e.target.value || 'Praag' });
  }

  getLocation() {
    if (this.props.match.params.item) {
      return <div className="container"><Link to="/agenda" className="py-2 inline-block text-purple-900">Terug naar Agenda</Link></div>
    } else {
      return <Search
        type="text"
        value={this.props.value}
        placeh={this.state.searchItem}
        onChange={this.updateSearch.bind(this)}
      />
    }
  }

  render() {

    const search = this.props.match.params.item || this.state.searchItem

    return (
      <div className="flex flex-col h-full">
        { this.getLocation() }
        <div className="relative w-full" style={{height: 'calc(100vh - 83px)'}}>
          <MapC src={`https://maps.google.com/maps?q=${search}&t=&10&ie=UTF8&iwloc=&output=embed`} /> 
        </div>        
      </div>
    );
  }
}