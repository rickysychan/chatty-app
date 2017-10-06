const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
const WebSocket = require('ws');

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws) => {

  let userCount = wss.clients.size
  console.log('connected number>>>', userCount)
  let msg = JSON.stringify({type: 'userCount', userCount});
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });

  ws.on('message', function incoming(message) {

    let parsedMessage = JSON.parse(message)
    parsedMessage['Uid'] = uuidv4();
    parsedMessage['userCount'] = userCount;
    console.log('received: %s',(parsedMessage[0].type));
    stringifyedMessage = JSON.stringify(parsedMessage)
    
      switch(parsedMessage[0].type) {
        case "postMessage":
          console.log('broadcasted! %s', stringifyedMessage)
          wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(stringifyedMessage);
            }
          });
          break;
        case "postNotification":
            console.log('broadcasted! %s', stringifyedMessage)
              wss.clients.forEach(function each(client) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                  client.send(stringifyedMessage);
                }
              });
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + parsedMessage[0].type);
      }
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => userCount--);
});