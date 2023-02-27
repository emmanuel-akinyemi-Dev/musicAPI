const JWT = require('jsonwebtoken');
const dotenv = require('dotenv').config() ;




exports.verifyUser = (req, res, next) => {

    try {

    const token = req.headers.Authentication

    const verified =  jwt.verify(token, process.env.JWT_SECRET)

    req.userData = verified

 next();

} 
catch(error){

     return null
        }
  }

        
 exports.sendToken = async (email, password)=>{
    try{
   return  JWT.sign({email:email, password:password}, process.env.JWT_SECRET, {expiresIn : '2w'}) 
       } 
       
   catch(err){
        return null
       }
        
        }
    
 




 