require('dotenv').config();
const connectToMongo=require('./db');
const express=require('express');
const cors=require('cors');

connectToMongo();
const app=express();
const port=5000;
app.use(cors());

app.get('/',(req,res)=>{
    res.send('Hello from server');
})

app.use(express.json());

app.listen(port,()=>{
console.log(`App listening on port ${port}`);
})