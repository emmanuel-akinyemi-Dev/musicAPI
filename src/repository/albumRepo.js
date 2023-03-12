const Album = require('../models/albumSchema');  
const mongoose = require('mongoose');
require('dotenv').config() ;
const Song = require('../models/songSchema');
const Artist = require('../models/artistSchema');  
const { addSong, getSongs, getOneSong,editSong,deleteSong  } = require('../repository/songRepo');

  
exports.getAlbums = async (query) => {
    try { 
     return await Album.find(query).populate('songId').populate('artistId').exec();
   
    }
    catch(err){
        console.error(err); 
    return null ;
        }  
}; 
exports.getOneAlbum = async (query) => {
    try { 
      return await  Album.findOne(query).populate('songId').populate('artistId').exec(); 
}
    catch(err){
        console.log(err);
      return null;

    }
} ; 
exports.createAlbum = async(query)=>{
try{ 
    const newArtist = new Album(query);  
    return  await newArtist.save();
       
}   
 
catch(err){
    console.log(err); 
    return null;

}
};
exports.deleteAlbum = async(query)=>{
    try{
      return await Album.deleteOne(query).exec()

    }
    catch(err){
        console.log(err); 
        return null;
    
    }
} ;
 exports.editAlbum = async(id, data)=>{ 
    try{
        const newData =  {}; 
        for (const updates  of data ){     
            newData[updates.propName]  = updates.value  
        }
 
       return await Album.updateOne({_id:id}, {$set : newData})
       
    }
    catch(err){ 
        console.log(data);
        console.log(err);
        return null
       
    }
}; 
 exports.addSongToAlbum = async(song, data)=>{ 
    try{
        console.log(data);
   
       return await Album.updateOne({songId: song}, {$push : data},)
       
    }
    catch{ 
        return null ;
    }
};  