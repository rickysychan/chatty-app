import React, {Component} from 'react';
class NavBar extends React.Component {

    render() { 
    return <div>
                <nav className="navbar">
                    <a href="/" className="navbar-brand">Chatty</a>
                    <h3 className="navbar-userCounter">{this.props.userCountData} user(s) online</h3>
                 </nav>
           </div>
    }

}

export default NavBar;