 
const router = require('express').Router();
const {getUsers,} = require('../../repository/userRepo');
const {getAllUsers, userLogin, createUser, deleteUser, editPassword, editUserData,editUserImage} = require('../../controllers/userController');
require('dotenv').config() ;
const {verifyUser} = require('../../middleware/auth')
const {uploads} = require('../../middleware/multer') 

router.get('/', getAllUsers) ;
router.post ('/signup', createUser) ; 
router.post ('/login', userLogin) ;   
router.delete ('/delete',verifyUser, deleteUser) ;
router.patch ('/updatepassword', verifyUser, editPassword ) ;
router.patch ('/updateuserdata',verifyUser, editUserData ) ;
router.patch ('/updateuserimage',verifyUser, uploads.single('avatar'), editUserImage ) ;
  
module.exports = router; 