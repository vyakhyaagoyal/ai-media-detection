const express=require('express');
const router=express.Router();
const axios=require('axios');

const host='http://localhost:5000'; 
router.post('/analyze',async(req,res)=>{
    const {url}=req.body;
    if(!url){
        return res.status(400).json({error:'URL not provided'});
    }

    try{
        const response=await axios.post(`${host}/api/predict`,url);
        res.json(response.data);
    }
    catch(error){
        console.error("Error",error);
        return res.status(500).json({error:'internal server error'});
    }
})

module.exports=router;