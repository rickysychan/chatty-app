import React, {Component} from 'react';

class ChatBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUsername: 'Annonymous',
            content: '',
            systemMessage: '',
            oldUsername: 'Annonymous'
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleNameKeyPress = this.handleNameKeyPress.bind(this);
      }

    // This fires when the chat bar message text box value changes
    handleChange(event) {
        // Use setState to change our state to equal the content of the text box
        this.setState({content: event.target.value});
    }

    handleNameChange(event) {
        let newSysMessage = ( this.state.oldUsername + ' has changed their name to ' + event.target.value)
        this.setState({currentUsername: event.target.value, systemMessage: newSysMessage})
    }

    // this sets the currentUser everytime input changes and creates the system message based on it

    handleKeyPress(event){
        if(event.charCode===13){
            this.setState({oldUsername: this.state.currentUsername})
            let dataObject = {
                'currentUsername' : this.state.currentUsername,
                'content'         : this.state.content,
                'type'            : 'postMessage',
                'sysMsg'         : this.state.systemMessage,
            }
            this.props.onMessageSend(dataObject);
            this.setState({content: ''});
        }
    }

    // this makes it so when enter key is pressed messageData is sent to app

    handleNameKeyPress(event) {
      if(event.charCode===13){
        this.setState({oldUsername: this.state.currentUsername})  
        let dataObject = {
            'type'      : 'postNotification',
            'content'   : this.state.systemMessage,
        }
        this.props.onNameChangeSend(dataObject);
        this.setState({systemMessage: ''});
      }
    }

    // this makes it so that when enter key is pressed systemMessage data is sent to app

    render() {
      return (
        <div>
        <footer className="chatbar">
            <input id="chatUsername"  
                className="chatbar-username" 
                placeholder="Your Name (Optional)" 
                onKeyPress={this.handleNameKeyPress}
                value={this.state.currentUsername}
                onChange={this.handleNameChange}/>
            <input id="chatMessage"  
                className="chatbar-message" 
                onKeyPress={this.handleKeyPress} 
                onChange={this.handleChange}  
                value={this.state.content}
                placeholder="Type a message and hit ENTER"/>
        </footer>
        </div>
      )
    }
  }

  export default ChatBar;