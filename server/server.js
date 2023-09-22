const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors:{
        origin: "http://localhost:3002", // Substitua pelo domínio correto do seu cliente React
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.static(__dirname + '/client'));

io.on('connection', (socket) => {
  console.log('Usuário conectado');

  socket.on('message', (message) => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
});

server.listen(3001, () => {
  console.log('Servidor está rodando na porta 3001');
});
