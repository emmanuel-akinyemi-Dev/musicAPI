const Song = require('../models/songSchema'); 
require('dotenv').config() ;
 

  
exports.getSongs = async (query) => {
    try { 
     return await Song.find(query).exec();
   
    }
    catch(err){
        console.error(err); 
    return null 
        }  
}, 
exports.getOneSong = async (query) => {
    try { 
      return await  Song.findOne(query).exec(); 
}
    catch(err){
        console.log(err);
      return null;

    }
}, 
exports.addSong = async(query)=>{
try{ 
    var newSong = new Song(query); 
    return  await newSong.save();
       
}   
 
catch(err){
    console.log(err);
    console.log(query)
    console.log(newSong) 
    return null;

}
}
exports.deleteSong = async(query)=>{
    try{
      return await Song.deleteOne(query).exec()
 
    }
    catch(err){
        console.log(err); 
        return null;
    
    }
 } 
 exports.editSong = async(id, data)=>{ 
    try{
        const newData =  {}; 
        for (const updates  of data ){     
            newData[updates.propName]  = updates.value  
        }
  
       return await Song.updateOne({_id:id}, {$set: newData})
         

    }
    catch{
        return null
    }
 }

 

