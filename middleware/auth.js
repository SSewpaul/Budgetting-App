const config= require('config');
const jwt= require('jsonwebtoken');

function auth(req,res,next){
    const token= req.header('x-auth-token');

    //Check for token
    if(!token){
        return res.status(401).json({msg:"Authorization denied"});
    }

    try{

        //Verify token
        const decoded= jwt.verify(token, config.get('jwtSecret'));

        //Add user from payload
        req.user=decoded;
        next();
    } 
    catch(e){
        return res.status(400).end({msg: "Token is not verified"});
    }
}

module.exports=auth;