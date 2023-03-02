 
 const Song = require('../models/songSchema'); 
 const Playlist = require('../models/playlistSchema')
 require('dotenv').config() ;
  
 exports.getAplaylist = async (query) => {
    try { 
     return await Playlist.findById(query).exec();
   
    }
    catch(err){
        console.error(err); 
    return null 
        }  
}, 
 
   
 exports.getPlaylists = async (query) => {
     try { 
      return await Playlist.find(query).populate('song').exec();
    
     }
     catch(err){
         console.error(err); 
     return null 
         }  
 }, 
  
 exports.createPlaylist = async(query)=>{
 try{ 
     var playlist = new Playlist(query); 
     return  await playlist.save();
        
 }   
  
 catch(err){
     console.log(err);
     console.log(query)
     console.log(newSong) 
     return null;
 
 }
 }

 exports.addSong = async(id, data)=>{  
        try{
          
           return await Playlist.updateOne({_id: id}, {$push : data},)
           
        }
        catch{ 
            return null ;
        }
    };  
  exports.deletePlaylist= async(query)=>{
    try{
      return await Playlist.deleteOne(query).exec()
 
    }
    catch(err){
        console.log(err); 
        return null;
    
    }
 } 
 exports.deleteSong = async(query)=>{
    try{
      return await Playlist.deleteOne(query).exec()
 
    }
    catch(err){
        console.log(err); 
        return null;
    
    }
 } 
 
 
