const express = require('express');
const router = express.Router() ;
const {verifyUser} = require('../../middleware/auth');  
const {getPlaylists, createPlaylist, addSong,removeSong ,deletePlaylist } = require( '../../controllers/playlistController.js');
  
  router.get ('/', verifyUser, getPlaylists); 
  router.post ('/newplaylist', verifyUser, createPlaylist); 
  router.patch ('/addsongs/:id', verifyUser, addSong); 
  router.delete('/deletesong/:id', verifyUser, removeSong); 
  router.delete ('/deleteplaylist/:id', verifyUser, deletePlaylist);
  
module.exports = router;