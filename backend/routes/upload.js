const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

router.post('/upload', upload.single('media'), (req, res) => {
    try {
        res.status(200).json({
            message: 'File uploaded successfully',
            file: req.file,
            path: req.file.path
        });
    }
    catch (error) {
        console.error("Error uploading file", error);
        res.status(500).send({ error: 'Upload failed!' });
    }
});

module.exports=router;