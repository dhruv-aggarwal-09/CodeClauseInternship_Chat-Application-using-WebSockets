const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3000 }); // Replace with your desired port number

const clients = new Set();

server.on('connection', (client) => {
    clients.add(client);

    client.on('message', (message) => {
        // Broadcast the received message to all connected clients
        clients.forEach((c) => {
            if (c !== client && c.readyState === WebSocket.OPEN) {
                c.send(message);
            }
        });
    });

    client.on('close', () => {
        clients.delete(client);
    });
});

console.log('WebSocket server is running on port 5500'); // Replace with your desired port number
