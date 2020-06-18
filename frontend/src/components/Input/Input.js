import React from 'react';

export default class Map extends React.Component {
    render() {
        return (
            <div className="w-full bg-purple-700 py-1">
                <div className="container">
                    <input
                        className="w-full p-1 rounded"
                        type={this.props.type}
                        value={this.props.value}
                        placeholder={this.props.placeh}
                        onChange={this.props.onChange}
                    />
                </div>                
            </div>
        );
    }
}
