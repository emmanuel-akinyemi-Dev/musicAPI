const express = require('express'); 
const app = express();
const v1 = require('./v1/v1')
 require('dotenv').config();


app.use('/v1',  v1)


module.exports = app
