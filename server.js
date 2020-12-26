const express = require('express');
const mongoose = require('mongoose');
const path=require('path');
const app=express();
const config=require('config')

//Defining routes
const items =require('./routes/api/item');
const users= require('./routes/api/user');
const auth= require('./routes/api/auth');

//Initiating in-built express body parsing
app.use(express.json())

//db config
const uri=config.get('mongoURI');


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
app.use('/api/auth',auth);

//Serve static assets while in production

if(process.env.NODE_ENV==='production')
{
    //set static folder
    app.use(express.static('client/build'));

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    });
}
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('server is running on port:' + port);
})