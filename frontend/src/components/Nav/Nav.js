import React from 'react';
//components
import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import BackDrop from '../BackDrop/BackDrop';

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            sideDrawerOpen: false
        };
    }

    drawerToggleClickHandler = () => {
        this.setState({sideDrawerOpen: true});
    }

    backDropClickHandler = () => {
        this.setState({sideDrawerOpen: false});
    }

    render() {

        return (
            <div className="">
                <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
                <SideDrawer click={this.backDropClickHandler} show={this.state.sideDrawerOpen} />
                <BackDrop click={this.backDropClickHandler} show={this.state.sideDrawerOpen} />
            </div>
        );
    }
}