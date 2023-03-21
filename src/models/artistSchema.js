const mongoose = require('mongoose');


const ArtistSchema = new mongoose.Schema({  
    artistName:{type:String , required:true },  
    avatar: { type: String, default: 'https://i.ibb.co/5Y3m5Y1/default.jpg' },
    age: String, 
    bio: {type:String, default: 'singer and Song writer' },
    albums: { type: [mongoose.Types.ObjectId], ref: 'Album' } 
    });

module.exports = mongoose.model('Artist', ArtistSchema);