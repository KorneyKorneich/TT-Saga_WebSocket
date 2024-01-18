const express = require('express');
const config = require('config');
const mongoose = require('mongoose').default;
const defaultPort = config.get('server');
const port = process.env.PORT || defaultPort;
const authRouter = require('./routes/auth.routes');
const projectRouter = require('./routes/project.routes');
const corsMiddleware = require('./middleware/cors.middleware')
const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use('/api/', authRouter);
app.use('/api/', projectRouter);
const start = async () => {
    try {
        await mongoose.connect(config.get("dbURL"));
        app.listen(port, () => {
            console.log(`Server started at port ${port}`);
        });
    } catch (e) {
        console.error('Error starting the server:', e);
    }
};

start();
