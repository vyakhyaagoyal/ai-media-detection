require('dotenv').config();
const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo();
const app = express();
app.use(express.json()); //must be before routes
app.use(cors());
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