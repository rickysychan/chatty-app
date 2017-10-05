import React, {Component} from 'react';

class Message extends React.Component {

    render() {
        return ( <div>
                  <span className="message-username">{this.props.username}</span>
                  <span className="message-content">{this.props.content}</span>
                 </div>
        )       
    }
}

export default Message;