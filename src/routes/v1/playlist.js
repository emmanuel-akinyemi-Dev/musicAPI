const express = require('express');
const router = express.Router() ;
const {verifyUser} = require('../../middleware/auth');  
const {getPlaylists, createPlaylist, addSong,removeSong  } = require( '../../controllers/playlistController.js');
  
  router.get ('/', verifyUser, getPlaylists); 
  router.post ('/newplaylist', verifyUser, createPlaylist); 
  router.patch ('/addsongs/:id', verifyUser, addSong); 
  router.patch('/deletesong/:id',verifyUser, removeSong); 
  router.delete ('/deletePlaylist',verifyUser, removeSong);
  
module.exports = router;