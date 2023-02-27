const fs =  require('fs'); 
const express = require('express')
const router = express.Router() 
const {uploadFile , rangeFunction  } = require( '../../controllers/playFileControler');
const {uploads} = require( '../../middleware/multer')
 
  router.get ('/play/:id', rangeFunction);
   router.post ('/uploadfile',  uploadFile ); 
//   router.patch ('/editsong',getFiles, editSong); 
//   router.delete ('/deletesong', removeSong); 
 
 
module.exports = router