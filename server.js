const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

// Serve static files from 'public' folder
app.use(express.static('public'));

// Listen for client connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for chat message from client
  socket.on('chat message', (msg) => {
    console.log('Message received:', msg);

    // Broadcast message to all clients, including sender
    io.emit('chat message', msg);
  });

  // Detect disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start server
http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
