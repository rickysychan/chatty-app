import React, {Component} from 'react';

class ChatBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUsername: 'Ricky',
            content: '',
            systemMessage: '',
            oldUsername: ''
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
        this.props.onUsernameChange(event.target.value);
        this.setState({currentUsername: event.target.value})
    }


    // this fires every key press on the message text box.
    handleKeyPress(target){
        // if the key is the enter key
        if(target.charCode==13){
            // call our onMessageSend prop passing the current content
            // This function is defined in App.jsx
            this.props.onMessageSend(this.state.content);
            // Clear our content to give us a fresh state to start from for our next message.
            this.setState({content: '', username: this.state.username});
        }
    }

    handleNameKeyPress(target){
        if(target.charCode==13){
            let systemMsg = this.state.oldUsername + ' has changed their name to ' + this.state.currentUsername
            this.setState({systemMessage: systemMsg});
            console.log('from chatbar >>>', this.state.systemMessage)
            this.props.onNameNotification(this.state.systemMessage);
        }
    }

    render() {
      return (
        <div>
        <footer className="chatbar">
            <input id="chatUsername"  
                className="chatbar-username" 
                placeholder="Your Name (Optional)" 
                onKeyPress={this.handleNameKeyPress}
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