import React from 'react';
import { Link } from "react-router-dom";
// components
import CloseButton from './CloseButton';
// assets
import './SideDrawer.css';

export default class SideDrawer extends React.Component {
    render(props) {

        const linkStyle = 'hover:text-orange-700 px-2';

        let drawerClasses = 'w-full h-full text-purple-700 fixed top-0 left-0 z-20 close';

        if (this.props.show) {
            drawerClasses = 'w-full h-full text-purple-700 fixed top-0 left-0 z-20 close open';
        }

        return (
            <nav className={drawerClasses} style={{backgroundColor: 'white', maxWidth:'400px'}}>
                <div className="">
                    <CloseButton click={this.props.click} />
                </div>
                <ul className="flex flex-col justify-center items-center">
                    <li onClick={this.props.click}><Link to="/" className={linkStyle}>Home</Link></li>
                    <li onClick={this.props.click}><Link to="/agenda" className={linkStyle}>Agenda</Link></li>
                    <li onClick={this.props.click}><Link to="/valuta" className={linkStyle}>Valuta</Link></li>
                    <li onClick={this.props.click}><Link to="/map" className={linkStyle}>Map</Link></li>
                    <li onClick={this.props.click}><Link to="/contact" className={linkStyle}>Contact</Link></li>
                </ul>
            </nav>
        );
    }
}