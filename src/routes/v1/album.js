const express = require('express')
const router = express.Router()
const {getAllAlbum,addAlbum,editAlbum, getOneAlbum,removeAlbum,addSongtoAlbum} = require('../../controllers/albumController')
const {verifyUser, sendToken} = require('../../middleware/auth');
const {uploads} = require('../../middleware/multer') 

router.get ('/allalbums', getAllAlbum);
router.get ('/searchalbum', getOneAlbum);
router.post ('/addalbum', verifyUser,  uploads.single('albumCover'), addAlbum);
router.patch ('/addsongtoalbum', verifyUser,  addSongtoAlbum); 
router.patch ('/editalbum',verifyUser, uploads.single('albumCover'), editAlbum); 
router.delete ('/deletealbum',verifyUser, removeAlbum); 
 
  

module.exports = router;