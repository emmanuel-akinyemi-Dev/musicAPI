 
const router = require('express').Router();
const {getUsers,} = require('../../repository/userRepo');
const {getAllUsers, userLogin, createUser, deleteUser, editPassword} = require('../../controllers/userController');
require('dotenv').config() ;

  
// Check list of user
/**
 * @swagger
 * /api/users:
 *  get:
 *      summary : Get all users
 *      description: this Api is all about music
 *      responses :
 *          200:
 *              decription: to test get  music data by id
 *              content:
 *                application/json:
 *                  schema:
 *                      type: document/json 
 */ 

router.get('/', getAllUsers) ;
router.post ('/signup', createUser) ; 
router.post ('/login', userLogin) ;   
router.delete ('/delete', deleteUser) ;
router.patch ('/update', editPassword ) ;
  
module.exports = router;