const mongoose = require('mongoose');


const SongSchema = new mongoose.Schema({
 
    songTitle:{ type:String, required:true },
    songAlbum:{type:String, required:true },
    albumId:{type:mongoose.Types.ObjectId, ref:'Album'},
    artistName:{type:String, required:true },
    artistId:{type:mongoose.Types.ObjectId, ref:'Artist'},  
    songGenre:{type:String},
    songYear:{ type:String},
    songDuration:{ type:String, required:true },
    song : { type:String, required:true},
    songCover:{ type:String,
        default:'https://i.ibb.co/5Y3m5Y1/default.jpg'}, 
    });

module.exports = mongoose.model('Song', SongSchema);