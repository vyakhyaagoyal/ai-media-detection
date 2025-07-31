require('dotenv').config();
const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const uploadRoute=require('./routes/upload');

connectToMongo();
const app = express();
app.use(express.json()); //must be before routes
app.use(cors());

app.use('/api/uploads',uploadRoute);
const port = 5000;
// console.log("MONGO_URI is:", process.env.MONGO_URI);

app.get('/', (req, res) => {
    res.send('Hello from server');
    console.log(req.body);
})

app.use('/api/auth', require('./routes/auth'));

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})