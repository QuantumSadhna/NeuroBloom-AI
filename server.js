const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let users = {}; // To keep track of connected users

// Serve static files (optional for frontend)
app.use(express.static('public'));

// When a user connects
io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);
    
    // Store the user's socket ID with their assigned username (or ID)
    socket.on('register', (username) => {
        users[username] = socket.id;
        console.log(`${username} registered`);
    });

    // Handling private messages
    socket.on('private_message', ({ to, message }) => {
        if (users[to]) {
            io.to(users[to]).emit('message', { from: socket.id, message });
            console.log(`Message sent to ${to}: ${message}`);
        }
    });

    // When the user disconnects
    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
    });
});

// Start the server on a specified port
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
