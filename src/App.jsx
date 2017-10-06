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
        messageData: [],
        systemMessage: [],
        // userNumber: messageData[0].userCount
         // messages coming from the server will be stored here as they arrives
      }
      this.appSocket = new WebSocket("ws://localhost:3001/") 
    }


    onMessageSend(content) {
      
      console.log('Sending message with content:', content)
      const recievedMessageData = this.state.messageData.concat(content)
      this.setState({messageData: recievedMessageData})
      this.appSocket.send(JSON.stringify(content));
    }

// receives messageData and sets the messageData state and than sends the content to server

    onNameChangeSend(content) {
      console.log('Sending message with content:', content)
      const systemMessages = this.state.systemMessage.concat(content)
      this.setState({systemMessages: systemMessages})
      this.appSocket.send(JSON.stringify(content));
    }

    // receives name change notification data and sets the systemMessage state and than sends the content to server

    componentDidMount() {
      this.appSocket = new WebSocket("ws://localhost:3001");
      this.appSocket.onmessage = (event) => {
        // console.log('Client has recieved broadcast', event);
        // code to handle incoming message
        let parsedEvent = JSON.parse(event.data)
        // when recieving data from server you need to use .data for some reason
        console.log('parsed data >>>', parsedEvent)
        const recievedMessageData = this.state.messageData.concat(parsedEvent)
        this.setState({messageData: recievedMessageData})  
      }
    }

    // after socket is mounted, it recieves data sent from teh server and parses it. 
    //it than sets the recieved data to messageData state which is passed to messageList

  render() {
    return (
      <div>
        <nav className="navbar">
           <a href="/" className="navbar-brand">Chatty</a>
           <h3 className="navbar-userCounter">{} user(s) online</h3>
        </nav>
        <MessageList messageData={this.state.messageData}/>
        <ChatBar onMessageSend={this.onMessageSend.bind(this)}
                 onNameChangeSend={this.onNameChangeSend.bind(this)}/>
      </div>

    )
  }
}
export default App;
