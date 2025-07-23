require('dotenv').config();
const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const multer = require('multer')

connectToMongo();
const app = express();
const port = 5000;
// const upload = multer({ dest: 'uploads/' }) //upload is a middleware
app.use(cors());

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/');
    },
    filename:function(req,file,cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});
const upload = multer({ storage: storage })

app.get('/', (req, res) => {
    res.send('Hello from server');
    console.log(req.body);
})

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.post('/upload', upload.single('profileImage'), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    res.send('Succesfully uploaded');
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})