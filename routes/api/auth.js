const express = require('express');
const router = express.Router();
const bcrypt=require('bcryptjs');
const config=require('config');
const jwt= require('jsonwebtoken');
const auth=require('../../middleware/auth');

//Item model
const User = require('../../models/User.js');

/* 
* @route: POST auth
* @desc: Authorize user
* @access Public
*/
router.post('/', (req, res) => {
    const { username, password } = req.body;

    //validation if all field have been filled
    if(!username || !password)
    {
        res.status(400).json({msg:"Enter all fields"});
    }

    //Checking if username already exists
    User.findOne({'username':username})
    .then(user=>{

        if(!user) return res.status(400).send({msg:"Account does not exist"});
    
        //Validate password
        bcrypt.compare(password,user.password)
        .then(isSame=>{
            if(!isSame)
            {
                return res.status(400).send({msg: "Invalid email or password"});
            }
        });

        //Create token
        jwt.sign({id: user.id},config.get('jwtSecret'), {expiresIn:1200},(err,token)=>{
        
            //Check for error
            if(err)
            {
                return err;
            }

            //Send response
            res.status(200).json({
                user:{
                    id:user.id,
                    username: user.username,
                    email:user.email
                },
                token: token
            });
        });
    });
});



/* 
* @route: GET auth
* @desc: Get user information
* @access Private
*/

router.get('/user',auth,(req,res)=>{
    User.findById(req.user.id,{'password':0})
    .then(user=>res.json(user));
});


//making file acessible to other files
module.exports = router;