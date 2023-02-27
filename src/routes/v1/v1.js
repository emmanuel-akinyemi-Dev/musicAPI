const express = require('express'); 
const app = express();

const albumRoute = require('./album')
const userRoute = require('./user');
const artistRoute = require('./artist');
const songRoute = require('./song');  
//const marketRoute = require('./market'); 
const playfileRoute = require('./playfile');  
 

//routes 

app.use('/users' ,  userRoute);
app.use('/songs', songRoute);
app.use('/albums', albumRoute);
app.use('/artists', artistRoute);
app.use('/songs', playfileRoute);
// app.use('/api/playlist', playlistRoute);
 
 // app.use('/api/market', marketRoute);


 module.exports  = app 