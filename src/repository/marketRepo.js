const MarketProduct = require('../models/marketSchema.js')  
const mongoose = require('mongoose');
require('dotenv').config() ;

  
exports.getProducts = async (query) => {
    try { 
     return await MarketProduct.find(query).populate('album').exec();
   
    }
    catch(err){
        console.error(err); 
    return null 
        }  
}, 
exports.getOneProduct = async (query) => {
    try { 
      return await  MarketProduct.findOne(query).populate('album').exec(); 
}
    catch(err){
        console.log(err);
      return null;

    }
}, 
exports.createProduct = async(query)=>{
try{ 
    const newProduct = new MarketProduct(query); 
    return  await newProduct.save();
       
}   
 
catch(err){
    console.log(err); 
    return null;

}
}
exports.removeProduct = async(query)=>{
    try{
      return await MarketProduct.deleteOne(query).exec()

    }
    catch(err){
        console.log(err); 
        return null;
    
    }
 } 
 exports.editProduct = async(id, data)=>{ 
    try{
        const newData =  {}; 
        for (const updates  of data ){     
            newData[updates.propName]  = updates.value  
        }
 
       return await MarketProduct.updateOne({_id:id}, {$set: newData}) 
    }
    catch{
        return null
    }
 }

 

