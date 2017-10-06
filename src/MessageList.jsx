import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends React.Component {

    render() { 
        return (<div>
                <main className="messages">   
                <div className="message system">    
                    {/* Anonymous1 changed their name to nomnom. */}
                </div>
                {this.props.messages.map((message, index) =>
                    <Message key={index} username={message.currentUsername} content={message.content} systemMessage={message.sysMsg}/>
                )}
                </main>
                </div>

        )
    } 
}

export default MessageList;