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
    }
    /*name:{
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        }
    }
    */
})

const User= mongoose.model('user',UserSchema);
module.exports=User;