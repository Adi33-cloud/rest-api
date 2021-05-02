const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const bodyParser = require('body-parser');



//Import Routes
const postsRoute = require('./routes/posts');

//Middlewares
app.use(bodyParser.json());
app.use('/posts', postsRoute);

//Routes
app.get('/', (req, res) => {
    res.send('We are on home');
})

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION_URL, { useNewUrlParser: true }, () => {
    console.log('connected to DB succesful');
});

//listen
app.listen(3000);
