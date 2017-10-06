import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

let nextId = 3;

class App extends Component {
  constructor(props){
    // pass the props to React.Component (i.e. the parent class of this component)
    super(props);
      this.state = {
        messageData: [],
        systemMessage: [],
        userCount: 0
         // messages coming from the server will be stored here as they arrives
      }
      this.appSocket = new WebSocket("ws://localhost:3001/") 
    }


    onMessageSend(content) {
      const recievedMessageData = this.state.messageData.concat(content)
      this.setState({messageData: recievedMessageData})
      this.appSocket.send(JSON.stringify(content));
    }

// receives messageData and sets the messageData state and than sends the content to server

    onNameChangeSend(content) {
      const systemMessages = this.state.systemMessage.concat(content)
      this.setState({systemMessages: systemMessages})
      this.appSocket.send(JSON.stringify(content));
    }

    // receives name change notification data and sets the systemMessage state and than sends the content to server

    componentDidMount() {
      this.appSocket.onmessage = (event) => {
        // console.log('parsed data >>>', event.data)
        let parsedEventData = JSON.parse(event.data)
        this.setState({userCount: parsedEventData.userCount})
        console.log('UserCount >>>>', this.state.userCount)
        // console.log('Client has recieved broadcast', event);
        // code to handle incoming message
        let parsedEvent = JSON.parse(event.data)
        // when recieving data from server you need to use .data for some reason
        const recievedMessageData = this.state.messageData.concat(parsedEvent)
        this.setState({userCount: event.data.userCount})
        this.setState({messageData: recievedMessageData}) 
        // this.setState({UserCountData: recievedMessageData[0]})
         
      }
    }

    // after socket is mounted, it recieves data sent from teh server and parses it. 
    //it than sets the recieved data to messageData state which is passed to messageList

  render() {
    return (
      <div>
        <NavBar userCountData={this.state.userCount}/>
        <MessageList messageData={this.state.messageData}/>
        <ChatBar onMessageSend={this.onMessageSend.bind(this)}
                 onNameChangeSend={this.onNameChangeSend.bind(this)}/>
      </div>

    )
  }
}
export default App;
