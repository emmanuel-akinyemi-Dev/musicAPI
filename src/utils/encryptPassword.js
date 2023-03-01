const bcrypt = require('bcrypt');
require('dotenv').config() ;
 
 
exports.encryptPassword =async (password, salt)=>{ 
    try{
      return  await bcrypt.hash(password, salt )
    }
 catch(err){
  console.log(err)
      return null;
 }
} 
exports.verifyPassword = async (userInput, hashPassword )=> {

  try{
    return await bcrypt.compare(userInput, hashPassword); 
  }
  catch(err){
    return null
  }

}
