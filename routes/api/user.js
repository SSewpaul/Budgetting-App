const express = require('express');
const router = express.Router();
const bcrypt=require('bcryptjs');
const config=require('config');
const jwt= require('jsonwebtoken');

//Item model
const User = require('../../models/User.js');

/* 
* @route: POST user
* @desc: Register user
* @access Public
*/
router.post('/', async (req, res) => {
    const { username, email, password } = req.body

    //validation
    if (!username || !email || !password) 
    {
        return res.status(400).json({msg:"Enter all fields"});
    }

    //Checking if username already exists
    User.findOne({'username':username})
    .then(user=>{
        if (user) return res.status(400).json({msg: "username already exists"});

        //Checking if email is already used
        User.findOne({'email':email})
        .then(user=>{
            if(user)
            {
                return res.status(400).json({msg: "Email already exists"});
            }

            //Creating new user
            const newUser=new User({username,email,password});

            //Create salt
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newUser.password,salt,(err,hash)=>
                {
                    //error handling
                    if(err) throw err;

                    //Hash password
                    newUser.password=hash;

                    //Save new user
                    newUser.save()
                    .then(user=>{
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
            });
        });
    });
});




//making file acessible to other files
module.exports = router;