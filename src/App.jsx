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


    onMessageSend(messageDataObject) {
      this.setState({messageData: this.state.messageData.concat(messageDataObject)}, () => {
        console.log('messageData >>>', this.state.messageData);
        this.appSocket.send(JSON.stringify(this.state.messageData));
      })
    }

// receives messageData and sets the messageData state and than sends the content to server
    onNameChangeSend(newNameDataObject) {
      this.setState({systemMessage: this.state.systemMessage.concat(newNameDataObject)}, () => {     
        console.log("systemMessage >>>",  this.state.systemMessage) 
        this.appSocket.send(JSON.stringify(this.state.systemMessage));} )
    }

    // receives name change notification data and sets the systemMessage state and than sends the content to server

    componentDidMount() {

      this.appSocket.onmessage = (event) => {
        let parsedEventData = JSON.parse(event.data)

        switch (parsedEventData.type) {
          case "userCount":
            this.setState({userCount: parsedEventData.userCount})
            break;

          case "incommingMessage":
            // parse incomming message and add to list of messages
            break;

          case "incommingNotification":
            // parse incomming notification
            break;

          default:
            break;
        }
        
        console.log('UserCount >>>>', this.state.userCount)
        // console.log('Client has recieved broadcast', event);
        // code to handle incoming message
        let parsedEvent = JSON.parse(event.data)
        // when recieving data from server you need to use .data for some reason
        const recievedMessageData = this.state.messageData.concat(parsedEvent)
        this.setState({messageData: recievedMessageData}) 
         
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
