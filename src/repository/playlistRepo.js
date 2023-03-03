 
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
     return null;
 
 }
 };

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
 };

 exports.removeSong = async(songArray, song )=>{
    try{
       let index =  songArray.indexOf(song) 
        if (index > -1){
           songArray.splice(index, 1 )
          return  songArray
        }
        // if (index > 0){
        //     var newArray =   songArray.splice(index, 2 )
        //     return  songArray
        // }
 
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
 
