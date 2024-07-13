const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


// get all routes
const authRoute = require('./Routes/authRoute')

const PORT = process.env.PORT || 8081

// Express app setup
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRoute)


app.listen(PORT, () => console.log(`Server is Running on PORT ${PORT}`));