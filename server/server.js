const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const path = require('path'); 

// app

const authRoute = require('./Routes/authRoute')
const UserRoute = require('./Routes/UserRoute')
const ContactRoute = require('./Routes/ContactRoute')
const MessageRoute = require('./Routes/MessageRoute')

const app = express();
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
app.use(cors())
app.use(express.json())

app.use('/auth', authRoute)
app.use('/user', UserRoute)
app.use('/contact', ContactRoute)
app.use('/message', MessageRoute)

app.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`)
})