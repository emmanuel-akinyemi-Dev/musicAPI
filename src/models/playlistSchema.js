const mongoose = require('mongoose');


const playListSchema = new mongoose.Schema({ 
    
    playlistTitle: {type : String, required : true} ,
    song: [{type : mongoose.Schema.Types.ObjectId, ref : 'Song'  }]  

    });

module.exports = mongoose.model('Playlist', playListSchema);