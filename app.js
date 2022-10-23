const express = require('express');
const tasks = require('./routes/tasks');
const path = require('path');
const connectDB = require('./db/connect');
const invalidRoute = require('./middleware/invalid-route');
const errorHandlerMiddleware = require('./middleware/error-handler');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// routes
app.use('/api/v1/tasks', tasks);
app.use(invalidRoute);
app.use(errorHandlerMiddleware);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(`App listening on port ${port}....`))
    } catch (err) {
        console.log(err);
    }
}

start();

