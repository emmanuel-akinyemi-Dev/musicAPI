 
const router = require('express').Router();
const {getUsers,} = require('../../repository/userRepo');
const {getAllUsers, userLogin, createUser, deleteUser, editPassword, editUser} = require('../../controllers/userController');
require('dotenv').config() ;
const {verifyUser} = require('../../middleware/auth')


router.get('/', getAllUsers) ;
router.post ('/signup', createUser) ; 
router.post ('/login', userLogin) ;   
router.delete ('/delete',verifyUser, deleteUser) ;
router.patch ('/updatepassword', verifyUser, editPassword ) ;
router.patch ('/updateuser',verifyUser, editUser ) ;
  
module.exports = router; 