const mongoose = require('mongoose');


const genreSchema = new mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    genre: String ,
    Songtitle:{ type:mongoose.Schema.Types.ObjectId, ref:'Song' }  ,
    album:{type: mongoose.Types.ObjectId , ref: 'Album' },
   
 
  
 
    });

module.exports = mongoose.model('Genre', genreSchema);