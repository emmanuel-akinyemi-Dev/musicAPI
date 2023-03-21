const express = require('express')
const router = express.Router()
const {getAllArtist,addArtist,editArtist, getOneArtist,removeArtist,addAlbum } = require('../../controllers/artistController')
const {verifyUser, sendToken} = require('../../middleware/auth');
const {uploads} = require('../../middleware/multer')  

router.get ('/', getAllArtist);
router.get ('/searchartist',  getOneArtist);
router.post ('/addartist', verifyUser, uploads.single('avatar'), addArtist); 
router.patch ('/editartist', verifyUser , uploads.single('avatar'), editArtist); 
router.patch ('/addalbum', verifyUser , addAlbum );
router.delete ('/deleteartist', verifyUser, removeArtist); 
 
   
 
module.exports = router;