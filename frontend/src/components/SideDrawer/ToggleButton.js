import React from 'react';

export default class ToggleButton extends React.Component {
    render(props) {
        const button = {
            height: '35px'
        }

        const line = {
            width: '35px',
            height: '2px',
            backgroundColor: 'white',
        }

        return (
            <button className="flex flex-col justify-around p-1" style={button} onClick={this.props.click}>
                <span style={line}></span>
                <span style={line}></span>
                <span style={line}></span>
            </button>
        );
    }
}