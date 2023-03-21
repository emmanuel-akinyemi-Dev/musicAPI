const mongoose = require('mongoose');


const AlbumSchema = new mongoose.Schema({
   
    albumName:String,
    albumCover:{
        type:String, 
    },
    albumYear:String,
    artistName:{
        type:String,
         required:true,
    },
    artistId:{
        type:mongoose.Types.ObjectId ,
        ref: 'Artist'
    },
    songId:{
    type:[mongoose.Types.ObjectId] ,
    ref: 'Song'
    } 
});

module.exports = mongoose.model('Album', AlbumSchema);