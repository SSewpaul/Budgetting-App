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
router.get('/:uname/:month/:year', auth,async (req, res) => {
    var uname = req.params.uname;
    var month = req.params.month;
    var year = req.params.year;
    const fromDate = new Date(year, month, 1);
    var toDate;
    switch(fromDate.getMonth())
    {
        case 0:
        case 2:
        case 4:
        case 6:
        case 7:
        case 9:
        case 11:
            toDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), 31);
        default:
            toDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), 30);
    }

    await Item.find({ 
        $and:[
            {"date":
                {
                    $gte:fromDate,
                    $lte:toDate
                }
            },
            {"username":uname}
        ]
    })
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
    const {name,cost,category,username}=req.body;
    
    if(!name || !cost || !category)
    {
        res.status(400).json({msg: 'Fill all fields'});
    }

    var newItem = new Item({
        name: name,
        cost: cost,
        category: category,
        username: username
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
