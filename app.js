const express = require('express');
const tasks = require('./routes/tasks');
const path = require('path');
const connectDB = require('./db/connect');
require('dotenv').config();

const app = express();
const port = 5000

// middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// routes
app.use('/api/v1/tasks', tasks);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(`App listening on port ${port}....`))
    } catch (err) {
        console.log(err);
    }
}

start();

