const async = require('async.js');
const JWT = require('jsonwebtoken');
const dotenv = require('dotenv').config() ;




exports.verifyUser = async (req, res, next) => {

    try {

        const data = req.headers.authorization ;
        const token = data.split(" ")[1] 
        const decoded = JWT.verify( token ,  process.env.JWT_SECRET ); 

        req.userData = decoded;
         
        next();
 
} 
catch(err){
console.log(err)
 res.status(403).json({
    message: "Authentication failed",
    error : err
}) 
  }
}

        
 exports.sendToken = async (email, password)=>{
    try{
   return  JWT.sign({email:email, password:password}, process.env.JWT_SECRET ) 
       } 
       
   catch(err){
        return null
       }
        
        };
    

 exports.decodeToken =  async (req)=> {
   try {
      return JWT.decode(req);
}
catch(err){
    console.log(err) ;
    return null;
}
};
 




 