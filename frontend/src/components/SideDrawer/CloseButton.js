import React from 'react';

export default class CloseButton extends React.Component {
    render(props) {
        const button = {
            width:'35px',
            height: '35px',
            left: '10px',
            top: '10px'
        }

        const line = {
            width: '35px',
            height: '2px',
        }

        return (
            <button className="relative flex justify-center items-center p-1" style={button} onClick={this.props.click}>
                <span style={line} className="first absolute left-0 bg-purple-700"></span>
                <span style={line} className="second absolute left-0 bg-purple-700"></span>
            </button>
        );
    }
}