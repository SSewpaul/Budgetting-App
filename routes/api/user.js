const express = require('express');
const router = express.Router();

//Item model
const User = require('../../models/User.js');
const { json, response } = require('express');

/* 
* @route: GET user id
* @desc: get all the items for a user
* @access Public
*/
router.get('/UserId/:name', (req, res) => {
    var uname = req.params.name;
    User.find({ 'username': uname }, { '_id': 1 })
        .then(user => res.json(user));

})

/* 
* @route: POST item
* @desc: Create item
* @access Public
*/
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body

    //validation
    if (!username || !email || !password) 
    {
        res.status(400).json({msg:"Enter all fields"});
    }

    //Checking if user already has an account
    User.findOne({email})
    .then(user=>{
        if(user)
        {
            res.status(400).json({msg: "Username already exists"});
        }
    })

})


//making file acessible to other files
module.exports = router;