const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {storage}=require('../utils/cloudinary');

router.post('/upload', upload.single('media'), (req, res) => {
    try {
        res.status(200).json({
            message: 'Upload successful',
            url:req.file.path,
            public_url:req.file.filename,
        });
        console.log("upload successful",req.file);
    }
    catch (error) {
        console.error("Error uploading file", error);
        res.status(500).send({ error: 'Upload failed!' });
    }
});

module.exports=router;