const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//Creating a schema
const ItemSchema= new Schema({
    name:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now,
        required: true
    },
    cost:{
        type: Number,
        required:true
    },
    category:{
        type:String,
        required:true
    }
    /*username:
    {
        type: String,
        required: true
    }*/
})

const Item =mongoose.model('item',ItemSchema);
module.exports=Item;