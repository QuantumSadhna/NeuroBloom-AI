const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let users = {}; // Stores usernames and their corresponding socket IDs

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Register user with their socket ID
    socket.on('register', (username) => {
        users[username] = socket.id;
        socket.username = username;
        console.log(`User registered: ${username} with socket ID: ${socket.id}`);
    });

    // Handle private messaging
    socket.on('private_message', ({ to, message }) => {
        if (users[to]) {
            // Send message to recipient
            io.to(users[to]).emit('message', { from: socket.username, message });

            // Also send back to sender so they see their own message
            socket.emit('message', { from: "You", message });

            console.log(`Message sent from ${socket.username} to ${to}: ${message}`);
        } else {
            // Notify sender that recipient is not found
            socket.emit('message', { from: "System", message: `User ${to} not found.` });
            console.log(`Message failed: User ${to} not found.`);
        }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        for (const username in users) {
            if (users[username] === socket.id) {
                delete users[username];
                console.log(`${username} removed from user list.`);
                break;
            }
        }
    });
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
