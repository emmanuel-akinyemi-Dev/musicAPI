
exports.generateSalt = saltround=>{
   const value =  Math.random()*saltround
   const salt  = value.toString().split ('.')[0]
   
        return  Number(salt)  
    
} 