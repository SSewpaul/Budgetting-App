const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//Creating a schema
const ItemSchema= new Schema({
    itemName:{
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
        minimum:0,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    /*userId:{
        type: Number,
        required: true,
    },*/
    username:
    {
        type: String,
        required: true
    }
}
)

const Item =mongoose.model('item',ItemSchema);
module.exports=Item;