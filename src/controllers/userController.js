const Users = require ('../models/userschema');
const {getUsers,createUser, getOneUser, removeUser,editPassword } = require('../repository/userRepo'); 
const {encryptPassword, verifyPassword} = require( '../utils/encryptPassword');
const { generateSalt } = require('../utils/generateSalt');
const {sendToken } = require('../middleware/auth'); 

exports.getAllUsers = async (req, res, next ) =>{

      const users = await getUsers(res, {}); 
    
if (users){
    res.status(200).json({
        message: 'users found',
        users: users
    });

}
else{  
    console.log(users);
    res.status(404).json({message:'no user found', 
    request:{
        type: 'POST', 
        description: 'create an account using this link',
        url: `http://localhost:${proceses.env.PORT||5000}/api/v1/users/login` 
    } 
   
    }); 
};
}; 
exports.createUser = async (req, res , next)=>{

    
    var oldUser = await getOneUser( {email:req.body.email}); 
    if (oldUser) {  
        return res.status(400).json({message:'user already exists',
        request:{
            type: 'POST',
            description: 'login using this link',
            link: `http://localhost:${process.env.PORT}/api/v1/users/login`
        }
    });
    }
    else if(!req.body.email) {
        return res.status(400).json({message:'please enter email', 
    })
}


    else{


         const salt = generateSalt(10) 
             const hashPassword = await encryptPassword( req.body.password, salt) 
 
             if (hashPassword === null) {
                return res.status(400).json({message: 'unable to create password, please ensure there is an input for password ' })
             }

     const avatar  = req.file
     if (avatar){
        let filePath = avatar.path
     } 
     else {
       filePath = 'https://i.ibb.co/5Y3m5Y1/default.jpg' 
     }         
          const newUser =  await createUser( { 
            fullName : req.body.fullName,
            email : req.body.email,
            password : hashPassword,
            bio : req.body.bio,
            avatar:filePath,
            phone: req.body.phone, 
            salt: salt,
            created_at: Date.now()

        })   
            res.status(201).json({
                message: 'user created successfully',
                user: newUser,
                request:{
                    type:'POST',
                    description: 'login using this link',
                    link: `http://localhost:${process.env.PORT}/api/v1/users/login`
                }
            })
        
    }
 }
exports.deleteUser = async(req, res, next) =>{
    const userExists = await getOneUser( {email: req.body.email})
    
    
    if (userExists ){
        const Authenticate = await verifyPassword(req.body.password, userExists.password)
        if (Authenticate === null){ 
            res.status(400).json({message:'Auth failed',
            request:{
                type: 'POST',
                message1: 'you can login using this link ',
                url1 : `http://localhost:${process.env.PORT||5000}/api/v1/users/login`,
                message2: 'you can create an account using this link ',
                url2 : `http://localhost:${process.env.PORT||5000}/api/v1/users/signup`  
                }   
            })  
     }
     else{
        removeUser( {id: userExists}) 
        res.status(200).json({message:'user deleted successfully',  
         request:{
           type: 'POST',
           message: 'you can signup using this link ',
           url : `http://localhost:${process.env.PORT||5000}/api/v1/users/signup` 

       }}) 
       }
   }
   else{ 
    res.status(404).json({message:'user does not exist',
    request:{
        type: 'POST',
        message: 'you can login using this link ',
        url : `http://localhost:${process.env.PORT||5000}/api/v1/users/login` 
        }   
    })   
   }
}
   
exports.userLogin =  async(req, res, next)=>{
    const userExists = await getOneUser( {email: req.body.email})
    if (userExists ){
       const verified = await verifyPassword(req.body.password, userExists.password);
       if (verified){
        const Token = await sendToken ( req.body.email, req.body.password);
        res.status(200).json({
            message:'login successful' ,
            token: Token 
        }) 
       }
       else{
        return res.status(401).json({
            message:'Auth failed, either email or password is incorrect',
            request:{
                type: 'POST',
                message: 'you can signup using this link ',
                url : `http://localhost:${process.env.PORT||5000}/api/v1/users/signup` 
     
            }

        })
       }   
    }

     else{
         
        res.status(400).json({message:'Auth failed, either username or password is incorrect',  
         request:{
           type: 'POST',
           message: 'you can signup using this link ',
           url : `http://localhost:${process.env.PORT||5000}/api/v1/users/signup` 

       }}) 
       }
    
}

exports.editUser = async(req, res, next)=>{
    const userExists = await getOneUser( {email: req.body.email})
    if (userExists === null){
        return res.status(404).json({message:'user does not exist',  
        request:{
          type: 'POST',
          message: 'you can signup using this link ',
          url : `http://localhost:${process.env.PORT||5000}/api/v1/users/signup` 

      }}) 
    } 
        
         const edited = await  editPassword(userExists._id, [{ "propName" : "password", "value": newPassword } ])
         if (edited === null){
            return res.status(500).json({
                message:'something went wrong internally',
                request:{
                    type: 'POST',
                    message: 'you can signup using this link ',
                    url : `http://localhost:${process.env.PORT||5000}/api/v1/users/signup`  
                } 
            }) 
        }
            return res.status(201).json({
                message:'password changed successfully',
                newdata:edited,
                request:{
                    type: 'POST',
                    message: 'you can login using this link',
                    url : `http://localhost:${process.env.PORT||5000}/api/v1/users/login`  
                } 
            })
 } 
 exports.editPassword = async(req, res, next)=>{
            const userExists = await getOneUser( {email: req.body.email})
            if (userExists === null){
                return res.status(404).json({message:'user does not exist',  
                request:{
                  type: 'POST',
                  message: 'you can signup using this link ',
                  url : `http://localhost:${process.env.PORT||5000}/api/v1/users/signup` 
        
              }}) 
            } 
               const verified = await verifyPassword(req.body.oldPassword, userExists.password); 
               if (verified === false||null){
                return res.status(401).json({
                    message:'auth failed, either email or password is incorrect',
                    request:{
                        type: 'POST',
                        message: 'you can signup using this link ',
                        url : `http://localhost:${process.env.PORT||5000}/api/v1/users/signup` 
             
                    } 
                })
               } 
                const salt = generateSalt(10)
                const newPassword = await encryptPassword(req.body.newPassword, salt)
 
                 if( newPassword === null){ 
                    return res.status(400).json({
                        message:'could not change password. please try again',
                        request:{
                            type: 'POST',
                            message: 'you can signup using this link ',
                            url : `http://localhost:${process.env.PORT||5000}/api/v1/users/signup`  
                        } 
                    })
                 } 
                 const edited = await  editPassword(userExists._id, [{ "propName" : "password", "value": newPassword } ])
                 if (edited === null){
                    return res.status(500).json({
                        message:'something went wrong internally',
                        request:{
                            type: 'POST',
                            message: 'you can signup using this link ',
                            url : `http://localhost:${process.env.PORT||5000}/api/v1/users/signup`  
                        } 
                    }) 
                }
                    return res.status(201).json({
                        message:'password changed successfully',
                        newdata:edited,
                        request:{
                            type: 'POST',
                            message: 'you can login using this link',
                            url : `http://localhost:${process.env.PORT||5000}/api/v1/users/login`  
                        } 
                    })
 }  