 
 const Song = require('../models/songSchema'); 
 const Users = require('../models/userschema')
 const Playlist = require('../models/playlistSchema')
 require('dotenv').config() ;
  
 exports.getAplaylist = async (query) => {
    try { 
     return await Playlist.findById(query).populate('songs').exec();
   
    }
    catch(err){
        console.error(err); 
    return null 
        }  
},  
exports.getplaulistFromUser  = async (query) => {
    try { 
        query.playlist

     return  ;
   
    }
    catch(err){
        console.error(err); 
    return null 
        }  
}, 

 exports.getPlaylists = async (query) => {
     try { 
      return await Playlist.find(query).populate('songs').exec();
    
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
     return null;
 
 }
 };

 exports.addSong = async(id, data)=>{  
        try{
            const newData = {songs:[data.songId]}
          
           return await Playlist.updateOne({_id: id}, {$push : newData} )
           
        } 
        catch(err){  
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
 };

 exports.removeSong = async(songArray, songId )=>{
    try{

      const removed =  songArray.filter(song => song._id != songId) 
          
        return  removed
    }
    catch(err){
        console.log(err); 
        return null;
    
    }
 }; 
  
 exports.editPlaylist = async(id, data)=>{ 
    try{
        const newData =  {}; 
        for (const updates  of data ){     
            newData[updates.propName]  = updates.value  
        }
 
       return await Playlist.updateOne({_id:id}, {$set : newData})
       
    }
    catch(err){ 
        console.log(data);
        console.log(err);
        return null
       
    }
}; 

 exports.editUserPlaylalyst = async(id, data)=>{ 
    try{
      
       return await Users.updateOne({_id:id}, {$push: data})
 
         

    }
    catch(err){
        console.log (err)
        return null
    }
 }
 
