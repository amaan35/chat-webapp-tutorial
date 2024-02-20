const express = require('express');
const app = express()
const http = require('http');
const cors = require('cors');
//Importing a class named server from socketIO lib
const { Server } = require('socket.io'); 

app.use(cors());

const server = http.createServer(app);

//Instantiating our socket IO server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket)=>{
    console.log("socket id : ", socket.id);
    socket.on("join_room", (roomId)=>{
        socket.join(roomId);
        console.log(`User with ID : ${socket.id} joined room with ID : ${roomId}`);
    })
    socket.on("disconnect", ()=>{
        console.log("User disconnected : ", socket.id);
    })
})

server.listen(3001, ()=>{
    console.log('server started...')
});