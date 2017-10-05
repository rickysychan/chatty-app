import React, {Component} from 'react';

let nextId = 3;

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
        // this.props.onUsernameChange(event.target.value);
        this.setState({currentUsername: event.target.value})
    }

    handleNameKeyPress(target){
        if(target.charCode===13){
            let NewSysMessage = ( this.state.oldUsername + ' has changed their name to ' + this.state.currentUsername)
            console.log(NewSysMessage)
            this.setState({systemMessage: NewSysMessage})
        }
    }

    handleKeyPress(event){
        if(event.charCode===13){
            this.setState({oldUsername: this.state.currentUsername})
            let dataObject = {}
            dataObject['currentUsername'] = this.state.currentUsername,
            dataObject['content'] = this.state.content,
            dataObject['id'] = nextId++
            dataObject['sysMsg'] = this.state.systemMessage
            this.props.onMessageSend(dataObject);
            this.setState({content: ''});
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