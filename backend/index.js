const express = require('express');
const config = require('config');
const mongoose = require('mongoose').default;
const defaultPort = config.get('server');
const port = process.env.PORT || defaultPort;
const authRouter = require('./routes/auth.routes')

const app = express();

app.use('/api/auth', authRouter);

const start = async () => {
    try {
        await mongoose.connect(config.get("dbURL"))
        app.listen(port, () => {
            console.log(`Server stated at port ${port}`)
        })
    } catch (e) {

    }
}

start();

