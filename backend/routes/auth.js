const express=require('express');
const router=express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {body, validationResult} = require('express-validator');
const User = require('../models/User');
// const fetchuser=require('./middleware/fetchuser');


//1st endpoint- Create a user using: POST "/api/auth/createuser". No login required
router.post('/createuser',[body('name').isLength({min:3}),body('email').isEmail(),body('password').isLength({min:5})],
async(req,res)=>{
    // console.log("BODY:", req.body);
    const error=validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({error: error.array(), success:false});
    }
    try{
        const {name,email,password}=req.body;
        let user=await User.findOne({email});
        if(user){
            return res.status(400).json({error: "User already exists", success:false});
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password, salt);

        user=await User.create({
            name,
            email,
            password:hashedPassword
        })
        res.json({ success: true, user });
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})

//2nd endpoint- Login user using: POST "/api/auth/login".
router.post('/login',[body('email').isEmail(),body('password').isLength({min:5})],
async(req,res)=>{
    const error=validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({error: error.array(), success:false});
    }
    try{
        const {email,password}=req.body;
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Please try to login with correct credentials", success:false});
        }

        const passwordCompare=await bcrypt.compare(password,user.password); //password:user entered just now, user.password:password stored in db

        if(!passwordCompare){
            return res.status(400).json({error: "Please try to login with correct credentials", success:false});
        }
        res.json({success:true, user});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports=router;