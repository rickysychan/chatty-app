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
        currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [] // messages coming from the server will be stored here as they arrives
      }
      this.appSocket = new WebSocket("ws://localhost:3001/") 
    }

    onUsernameChange(newName) {
      this.state.currentUser.name = newName
    }

    onMessageSend(content) {
      
      console.log('Sending message with content:', content)
      let newMessage = {id: nextId++, username: this.state.currentUser.name, content: content};
      const messages = this.state.messages.concat(newMessage)
      console.log(this.state.messages);
      this.setState({messages: messages})
      this.appSocket.send(JSON.stringify(newMessage));
    }

    componentDidMount() {
      // console.log("componentDidMount <App />");
      // console.log("componentDidMount <App />");
      // setTimeout(() => {
      //   console.log("Simulating incoming message");
      //   // Add a new message to the list of messages in the data store
      //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      //   const messages = this.state.messages.concat(newMessage)
      //   // Update the state of the app component.
      //   // Calling setState will trigger a call to render() in App and all child components.
      //   this.setState({messages: messages})
      // }, 3000);
      this.appSocket = new WebSocket("ws://localhost:3001");
      this.appSocket.onmessage = (event) => {
        console.log('Client has recieved broadcast', event);
        // code to handle incoming message
        let parsedEvent = JSON.parse(event.data)
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
          onMessageSend={this.onMessageSend.bind(this)}
          onUsernameChange={this.onUsernameChange.bind(this)}/>
      </div>

    )
  }
}
export default App;
