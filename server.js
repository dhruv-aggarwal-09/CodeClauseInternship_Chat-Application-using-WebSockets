const WebSocket = require('ws');

const PORT = 3000

const server = new WebSocket.Server({ port: PORT }); // Replace with your desired port number

const clients = new Set();

server.on('connection', (client) => {
    console.log("Client Added")
    clients.add(client);

    client.on('message', (message) => {
        console.log(message.toString())
        // Broadcast the received message to all connected clients
        clients.forEach((c) => {
            c.send(message);
            // if (c !== client && c.readyState === Websocket.OPEN){
            //  }
        });
    });

    client.on('close', () => {
        clients.delete(client);
    });
});

console.log(`WebSocket server is running on port ${PORT}`); // Replace with your desired port number
