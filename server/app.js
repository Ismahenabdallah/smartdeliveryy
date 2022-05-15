var express = require('express');
var path = require('path');
const fileUpload = require('express-fileupload')
var cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
const mongoose = require('mongoose')
var indexRouter = require('./routes/index');



const passport = require('passport')
var clc = require("cli-color");
var app = express();


app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.json({ extended: false }))
app.use(fileUpload({
    useTempFiles: true
}))
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    res.setHeader('Acces-Control-Allow-Origin', '*')
    res.setHeader('Acces-Control-Request-Method', '*')
    res.setHeader('Acces-Control-Allow-Header', '*')
    next()
})

/* passport */
app.use(passport.initialize())
require('./security/passport')(passport)
/* connect to db */
mongoose.connect(process.env.MONGO_URI,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
       
    })
    .then(() => console.log(clc.yellow.underline(`Server running on PORT ${process.env.PORT}...`)))
    .catch(err => console.log(err))
app.use('/api', indexRouter);






/*
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res)=>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}
*/




module.exports = app;
