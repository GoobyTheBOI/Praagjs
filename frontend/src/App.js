import React from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";
// Pages
import Home from './pages/Home';
import Agenda from './pages/Agenda';
import Map from './pages/Map';
import Valuta from './pages/Valuta';
import ContactPage from './pages/Contact';
// Assets
import './assets/css/Output.css'
// Components
import Nav from './components/Nav/Nav';

export default class App extends React.Component {

    render() {
        return (
          <Router>
            <Nav />
                <div className="w-full">
                    <Switch>
                        <Route exact path="/" component={Home} />   
                        <Route exact path="/map/:item" component={Map} />                     
                        <Route path="/map" component={Map} />
                        <Route path="/contact" component={ContactPage} />
                        <Route path="/agenda" component={Agenda} />
                        <Route path="/valuta" component={Valuta} />
                        <Route path="*" component={NoMatch} />
                    </Switch>
                </div>
            </Router>
        );

        function NoMatch() {
            let location = useLocation();

            return (
                <div className="container min-h-screen flex justify-center items-center flex-col">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl">
                        <b>404</b> Page Not Found
                    </h1>
                    <p className="text-2xl md:text-3xl lg:text-4xl break-all">
                        No match for <code>{location.pathname}</code>
                    </p>
                </div>
            );
        }
    }
}
