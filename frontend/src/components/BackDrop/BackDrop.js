import React from 'react';
// assets
import './BackDrop.css'

export default class BackDrop extends React.Component {
    render(props) {

        let Classes = 'fixed w-full h-full top-0 left-0 z-10 close';

        if (this.props.show) {
            Classes = 'fixed w-full h-full top-0 left-0 z-10 close open';
        }

        return (
            <div onClick={this.props.click} className={Classes} />
        );
    }
}