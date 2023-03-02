const express = require('express');
const router = express.Router() ;
const {verifyUser} = require('../../middleware/auth');  
const {getAllSongs,findOneSong,addSong,editSong,removeSong  } = require( '../../controllers/songController');
const {uploads} = require( '../../middleware/multer') 

const getFiles = uploads.fields([{name:'song', maxCount: 1 },{name:'songCover', maxCount: 1}]);

  router.get ('/', getAllSongs);
  router.get ('/findsong', findOneSong);
  router.post ('/upload',verifyUser,   getFiles, addSong); 
  router.patch ('/editsong', verifyUser, getFiles, editSong); 
  router.delete ('/deletesong',verifyUser, removeSong); 
 




module.exports = router