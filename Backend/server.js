const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Object to keep track of connected users and their socket IDs
let users = {};

// Serve static files from the 'public' directory (if applicable)
app.use(express.static('public'));

// Event listener for new socket connections
io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`);
    
    // Register a user with a username and store their socket ID
    socket.on('register', (username) => {
        users[username] = socket.id;
        console.log(`${username} registered with ID: ${socket.id}`);
    });

    // Handle private messaging between users
    socket.on('private_message', ({ to, message }) => {
        if (users[to]) {
            io.to(users[to]).emit('message', { from: socket.id, message });
            console.log(`Private message from ${socket.id} to ${to}: ${message}`);
        } else {
            console.log(`Failed to send message. User ${to} not found.`);
        }
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        
        // Remove the disconnected user from the users list
        for (const username in users) {
            if (users[username] === socket.id) {
                delete users[username];
                console.log(`${username} removed from user list.`);
                break;
            }
        }
    });
});

// Start the server and listen on port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
