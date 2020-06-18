import React, {Component} from "react";
import { useLocation } from "react-router-dom";

import { Link } from 'react-router-dom'


class Nav extends Component{  
    render() { 
    return (
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <h1 className="text-white text-xl mr-6">{this.props.title}</h1>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link to={`/admin/${this.props.title.toLowerCase()}/add`} className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              Add
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
