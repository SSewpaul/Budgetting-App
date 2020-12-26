const express = require('express');
const router = express.Router();
const auth=require('../../middleware/auth')

//Item model
const Item = require('../../models/Items.js');

/* 
 * @route: GET item
 * @desc: get all the items for a user
 * @access Private
*/
router.get('/', (req, res) => {
    //var uname = req.params.uname;
    Item.find(/*{ 'username': uname }, { '_id': 0 }*/)
        .sort({ date: -1 })
        .then(item => res.json(item))
        .catch(err => res.status(404).json({ msg: 'Item not found' }))
})

/* 
 * @route: POST item
 * @desc: Create item
 * @access Private
*/
router.post('/', auth, (req, res) => {
    const {name,cost,category}=req.body;
    
    if(!name || !cost || !category)
    {
        res.status(400).json({msg: 'Fill all fields'});
    }

    var newItem = new Item({
        name: name,
        cost: cost,
        category: category
    });

    newItem.save((err, insertedItem) => {
        if (err) {
            res.status(409).json({msg:"Unable to add item"});
        }
        res.json(insertedItem);
    });
})

/* 
 * @route: DELETE item
 * @desc: Delete an item
 * @access Public
*/
router.delete('/:itemId', auth,(req, res) => {
    var DeletedItem = req.params.itemId;
    if (Item.findById(DeletedItem) == null) {
        res.status(404).json({ msg: "Item not found" });
    }
    else {
        Item.deleteOne({ '_id': DeletedItem }, (err) => {
            if (err) {
                res.status(409).json({ msg: "Delete failed" });
            }
            res.json({ msg: "Deletion successful" });
        });
    }
})

//making file acessible to other files
module.exports = router;
