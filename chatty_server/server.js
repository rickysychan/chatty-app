// server.js

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

  ws.on('message', function incoming(message) {
    let parsedMessage = JSON.parse(message)
    parsedMessage['Uid'] = uuidv4();
    parsedMessage['type'] = 'incomingMessage';
    console.log('received: %s', JSON.stringify(parsedMessage));
    stringifyedMessage = JSON.stringify(parsedMessage)
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(stringifyedMessage);
        console.log('broadcasted! %s', stringifyedMessage)
      }
    });
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});
