import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

let nextId = 3;

class App extends Component {
  constructor(props){
    // pass the props to React.Component (i.e. the parent class of this component)
    super(props);
      this.state = {
        messages: [], // messages coming from the server will be stored here as they arrives
      }
      this.appSocket = new WebSocket("ws://localhost:3001/") 
    }

    onMessageSend(content) {
      
      console.log('Sending message with content:', content)
      let newMessage = content
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages})
      this.appSocket.send(JSON.stringify(newMessage));
    }

    componentDidMount() {
      this.appSocket = new WebSocket("ws://localhost:3001");
      this.appSocket.onmessage = (event) => {
        // console.log('Client has recieved broadcast', event);
        // code to handle incoming message
        let parsedEvent = JSON.parse(event.data)
        // when recieving data from server you need to use .data for some reason
        const messages = this.state.messages.concat(parsedEvent)
        this.setState({messages: messages})  
      }
    }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser}
                 onMessageSend={this.onMessageSend.bind(this)}/>
      </div>

    )
  }
}
export default App;
