 const Artist = require('../models/artistSchema')  
 const mongoose = require('mongoose');
 require('dotenv').config() ;
 
   
 exports.getArtists = async (query) => {
     try { 
      return await Artist.find(query).populate('album').exec();
    
     }
     catch(err){
         console.error(err); 
     return null 
         }  
 }, 
 exports.getOneArtist = async (query) => {
     try { 
       return await  Artist.findOne(query).populate('album').exec(); 
 }
     catch(err){
         console.log(err);
       return null;
 
     }
 }, 
 exports.createArtist = async(query)=>{
 try{ 
     const newArtist = new Artist(query); 
     return  await newArtist.save();
        
 }   
  
 catch(err){
     console.log(err); 
     return null;
 
 }
 }
 exports.removeArtist = async(query)=>{
     try{
       return await Artist.deleteOne(query).exec()
 
     }
     catch(err){
         console.log(err); 
         return null;
     
     }
  } 
  exports.editArtist = async(id, data)=>{ 
     try{
         const newData =  {}; 
         for (const updates  of data ){     
             newData[updates.propName]  = updates.value  
         }
 
        return await Artist.updateOne({_id:id}, {$set: newData})
          
 
     }
     catch{
         return null
     }
  }
 
  
 
 