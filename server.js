/* Imports */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

/* Connecting to mongodb */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB successfully connected')
},
    error => {
        console.log('MongoDB connection failed due to: ' + error)
    }
)

const helloRoute = require('./routes/hello');
const healthRoute = require('./routes/health');
const distanceRoute = require('./routes/distance');
const popularsearchRoute = require('./routes/popularSearch');

/* Adding middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


/* Create port & listen to it */ 
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log('Connected to port ' + PORT)
});

/* Routes */ 
app.use('/hello', helloRoute);
app.use('/health', healthRoute);
app.use('/distance', distanceRoute);
app.use('/popularsearch', popularsearchRoute);

/* Errors middleware */
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});


app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});


