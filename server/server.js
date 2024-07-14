const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const path = require('path'); 
const { Server } = require('socket.io');
const http = require('http');

// app

const authRoute = require('./Routes/authRoute')
const UserRoute = require('./Routes/UserRoute')
const ContactRoute = require('./Routes/ContactRoute')
const MessageRoute = require('./Routes/MessageRoute')
const Message = require('./Models/Message')

const app = express();
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(cors())
app.use(express.json())
const server = http.createServer(app);
const io = new Server(server);

app.use('/auth', authRoute)
app.use('/user', UserRoute)
app.use('/contact', ContactRoute)
app.use('/message', MessageRoute)


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', async (msg) => {
        const message = new Message({ sender: msg.EmailUser, receiver: msg.CurrentChat, messgaeContent: msg.Msg.MessageSend });
        await message.save();
        io.emit('chat message', msg);
    });
});

app.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`)
})