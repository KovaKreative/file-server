// Start server
const net = require('net');
const server = net.createServer();
const getFile = require('./fileManager');

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});

// Connect client
server.on('connection', (client) => {
  console.log("New client connected");
  client.write("You are connected to the server.");
  client.setEncoding('utf8');

  // Listen for file request
  client.on('data', (data => {
    data = data.trim();
    const parsedRequest = data.split(':');
    if (parsedRequest[0] === 'req') {
      console.log("Client has requested " + parsedRequest[1]);
      getFile(parsedRequest[1], sendError, sendFile, client);
    }
  }));
});

const sendError = function(client) {
  client.write("err:Something went wrong. There may not be such a file in our directory. Please check the filename and try again.");
};

const sendFile = function(data, client) {
  client.write('file:' + data);
};