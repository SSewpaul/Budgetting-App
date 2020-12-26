const mongoose= require('mongoose');
const router = require('../routes/api/item');
const Schema= mongoose.Schema;

const UserSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    regDate:{
        type:Date,
        default:Date.now,
        required:true
    }
});

const User= mongoose.model('user',UserSchema);
module.exports=User;