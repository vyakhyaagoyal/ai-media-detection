import React from 'react'
import jwt from 'jsonwebtoken';

const fetchUser = (req,res,next) => {
    const token=req.header('auth-token');
    if(!token){
        return res.status(400).json({error:'Please authenticate using a valid token',success:false});
    }
    try{
        const data=jwt.verify(token,process.env.JWT_SECRET);
        req.user=data;
        next();
    }
    catch(error){
        console.error(error.message);
        return res.status(400).json({error:'Internal server error',success:false});
    }
}

export default fetchUser
