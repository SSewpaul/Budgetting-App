const express = require('express');
const mongoose = require('mongoose');

const app=express()
const port = process.env.PORT || 5000;

//Defining routes
const items =require('./routes/api/item');
const users= require('./routes/api/user');

//Initiating in-built express body parsing
app.use(express.json())

//db config
const uri=require('./config/keys').URI;


//connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const conn = mongoose.connection;

mongoose.connection.on('connected', () => {  
    console.log("MongoDB successfully connected");
});

mongoose.connection.on('error', (err) => {
    console.log("Mongoose default connection has occured "+err+" error");
});


//using API routes
app.use('/api/item',items);
app.use('/api/user',users);

app.listen(port, () => {
    console.log('server is running on port:' + port);
})