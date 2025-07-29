const jwt = require('jsonwebtoken');

const fetchUser = (req,res,next) => {
    const token=req.header('auth-token');
    console.log("Token is:", token);
    if(!token){
        return res.status(400).json({error:'Please authenticate using a valid token',success:false});
    }
    try{
        const data=jwt.verify(token,process.env.JWT_SECRET);
        req.user=data;
        console.log("token approved and send back user details");
        next();
    }
    catch(error){
        console.error(error.message);
        return res.status(400).json({error:'Internal server error',success:false});
    }
}

module.exports=fetchUser;
