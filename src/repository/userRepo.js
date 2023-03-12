 
const Users = require('../models/userschema');
const mongoose = require('mongoose');
require('dotenv').config() ;






exports.getUsers = async (query) => {
    try { 
     return await Users.find(query).populate('playlist').exec();
   
    }
    catch(err){
        console.error(err); 
    return null 
        }  
}, 
exports.getOneUser = async (query) => {
    try { 
      return await  Users.findOne(query).exec(); 
}
    catch(err){
        console.log(err);
      return null;

    }
}, 
exports.createUser = async(query)=>{
try{ 
    const newUser = new Users(query); 
    return  await newUser.save();
       
}   
 
catch(err){
    console.log(err); 
    return null;

}
}
exports.removeUser = async(query)=>{
    try{
      return await Users.deleteOne(query).exec()

    }
    catch(err){
        console.log(err); 
        return null;
    
    }
 }  
 exports.editUser = async(id, data)=>{ 
    try{
        const newData =  {}; 
        for (const updates  of data ){     
            newData[updates.propName]  = updates.value  
        } 
       return await Users.updateOne({_id:id}, {$set: newData})
         

    }
    catch(err){
        console.log (err)
        return null
    }
 }

 
