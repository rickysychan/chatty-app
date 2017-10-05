import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends React.Component {

    render() { 
        return (<div>
                <main className="messages">   
                <div className="message system">    
                    {/* Anonymous1 changed their name to nomnom. */}
                </div>
                {this.props.messages.map((message) =>
                    <Message key={message.id} username={message.username} content={message.content} />
                )}
                </main>
                </div>

        )
    } 
}

export default MessageList;