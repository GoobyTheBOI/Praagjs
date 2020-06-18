import React from 'react';

export default class MapCom extends React.Component {
    
    render() {

        return (
            <div className="w-full h-full">
                <iframe title="Praag" className="w-full h-full" src={this.props.src} frameBorder="0" allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
            </div>
        );
    }
}