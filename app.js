require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoStore = require('connect-mongo');
const mainRouter = require('./routes/main');
const app = express();

app.set('view engine','ejs');
app.set('views','views');
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static('public'));
app.use(session({
    secret : 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({
        mongoUrl: process.env.MONGO_URI
    })
}))
app.use(mainRouter);

mongoose.connect(process.env.MONGO_URI)
.then((result)=>{
    console.log("Dataase Connected:",result.connection.host)    
    app.listen(5000,()=>{
        console.log("Listening to port 5000...")
    })
})
