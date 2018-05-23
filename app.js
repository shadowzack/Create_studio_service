const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const moviesRoutes = require('./api/routes/movies');
const morgan = require('morgan');
const mongoose = require('mongoose');

//mongoose.connect('mongodb://usr_db:pass_db@ds219040.mlab.com:19040/computer_books');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//cors to allow access 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        "Origin,X-Resquested-With,Content-Tybe,Accept,Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE');
        return res.status(200).json({});
    }
    next();
});


app.use('/', moviesRoutes);


//handling page not found error
app.use((req, res, next) => {
    const error = new Error('page not found');
    error.status = 404;
    next(error);

});

//handling rest of errors
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;