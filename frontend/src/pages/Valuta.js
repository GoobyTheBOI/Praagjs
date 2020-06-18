import React from 'react';
import toggle from './../assets/img/toggle.svg';

class Valuta extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '', // Value from input
      convertTo: 0, // 0 = CZK -> EUR; 1 = EURO -> CZK
      converted: 0, // Converted value
      eurToCzk: localStorage.getItem('eurToCzk') || 27.053, // Set default exchange rates if localStorage isn't set
      czkToEur: localStorage.getItem('czkToEur') || 0.0369644771, // Set default exchange rates if localStorage isn't set
    }
  }

  componentDidMount() {
    // Update exchange rates to most recent one available in the API
    // Get current time in miliseconds
    const time = new Date().getTime();

    // Check if time is already stored
    if (localStorage.getItem('exchangeRateDate')) {
      const timeDifference = time - localStorage.getItem('exchangeRateDate');
      const timeAllowedToPas = 1000 * 60 * 60 * 24; // 24H

      // Check if time has passed
      if (timeDifference > timeAllowedToPas) {
        // Remove current exchange rates
        localStorage.removeItem('czkToEur');
        localStorage.removeItem('eurToCzk');

        // Reset echange rate date to now
        localStorage.setItem('exchangeRateDate', time);
      }
    } else {
      // Add to localStorage if it doesn't exists already
      localStorage.setItem('exchangeRateDate', time);
    }

    // Check if exchange rate is already set in local storage
    if (!localStorage.getItem('czkToEur')) {
      const urlCzkToEur = 'https://api.exchangeratesapi.io/latest?base=CZK&symbols=EUR';
      fetch(urlCzkToEur)
        .then(response => response.json())
        .then(data => localStorage.setItem('czkToEur', data.rates.EUR));
    }

    // Check if exchange rate is already set in local storage
    if (!localStorage.getItem('eurToCzk')) {
      const urlEurToCzk = 'https://api.exchangeratesapi.io/latest?base=EUR&symbols=CZK';
      fetch(urlEurToCzk)
        .then(response => response.json())
        .then(data => localStorage.setItem('eurToCzk', data.rates.CZK));
    }
  }

  render() {
    const handleOrder = () => {
      const newConvertTo = this.state.convertTo ? 0 : 1;
      this.setState({
        convertTo: newConvertTo,
        converted: 0,
        value: '',
      });
    }

    const handleConvert = (e) => {
      const { value } = e.target;
      let newValue = value;

      // Convert comma to dot
      newValue = value.replace(/,/g, '.');
      // Remove every character which isn't a digit or dot
      newValue = newValue.replace(/[^.\d]/g, '');

      // Check how many characters are inside of input
      if (newValue.length > 10) return;

      // Convert to other currency
      let converted = newValue * this.state.eurToCzk;
      if (this.state.convertTo) {
        converted = newValue * this.state.czkToEur;
      }

      // Round to 2 decimals
      converted = converted.toFixed(2);

      // if (isNaN(newValue)) {
      //   newValue = value;
      //   converted = this.state.converted;
      // }

      // Update converted value in state
      this.setState({ value: newValue, converted });
    }

    return (
      <div className="container py-4 lg:py-10">
        <h1 className="text-4xl font-semibold">Valuta converter</h1>
        <div className="flex">
          <input type="text" onChange={handleConvert} value={this.state.value} placeholder={this.state.convertTo ? 'Tsjechische kroon' : 'Euro'} className="py-2 px-4 border-gray-400 border outline-none w-full sm:w-auto focus:border-gray-500"></input>
          <div className="flex h-12 w-12 bg-purple-700 cursor-pointer hover:bg-purple-800" onClick={handleOrder} title="Wissel volgorde"><img src={toggle} alt="toggle" className="m-auto h-6 w-6"></img></div>
        </div>
        <span className="text-xs text-purple-700 mx-4">{this.state.convertTo ? 'Tsjechische kroon -> Euro' : 'Euro -> Tsjechische kroon'}</span>
        <div className="flex flex-col text-md mt-3">
          <h2 className="text-2xl font-semibold">Waardes</h2>
          <span className={this.state.convertTo ? 'font-bold' : ''}>Euro: {this.state.convertTo ? this.state.converted : this.state.value ? this.state.value : 0}</span>
          <span className={!this.state.convertTo ? 'font-bold' : ''}>Tsjechische kroon: {!this.state.convertTo ? this.state.converted : this.state.value ? this.state.value : 0}</span>
        </div>
      </div>
    );
  }
}

export default Valuta;
