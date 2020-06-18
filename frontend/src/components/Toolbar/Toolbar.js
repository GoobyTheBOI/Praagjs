import React from 'react';
// components
import ToggleButton from '../SideDrawer/ToggleButton';

export default class Toolbar extends React.Component {
    render(props) {
        return (
            <header className="w-full bg-purple-700 py-1 text-white">
                <nav className="container w-full flex flex-row justify-between">
                    <ToggleButton click={this.props.drawerClickHandler} />
                </nav>
            </header>
        );
    }
}
