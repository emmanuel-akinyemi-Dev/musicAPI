const {getUsers,createUser, getOneUser, removeUser,editUser } = require('../repository/userRepo'); 
const {   getSongs, getOneSong,editSong,deleteSong  } = require('../repository/songRepo');  
const {createPlaylist, getPlaylists,getAplaylist,removeSong,editPlaylist, addSong,deletePlaylist, editUserPlaylalyst} = require('../repository/playlistRepo');
const { addSongToAlbum } = require('../repository/albumRepo'); 
const {sendToken, decodeToken } = require('../middleware/auth'); 
const { find } = require('../models/userschema');
const { decode } = require('jsonwebtoken');
const playlistSchema = require('../models/playlistSchema');
  


exports.getPlaylists = async (req, res, next ) =>{

    const playlist = await getPlaylists({});  
if (playlist === null || playlist.length < 1 ){ 
    return res.status(404).json({message:' No Playlist found', 
     
    });   
}
 
res.status(200).json({
    message: 'Playlists found',
    playlist : playlist
}) 
};  

exports.createPlaylist = async (req, res , next)=>{  
 const decoded = await decodeToken(req.headers.authorization.split(" ")[1] ) 
  var songExist = await getOneSong( {_id: req.body.song});  
  if (!songExist) {  
    return res.status(400).json({message: 'Song does not exist'  
    })  
  }
  
        const newPlaylist =  await createPlaylist( { 
            playlistTitle : req.body.playlistTitle , 
            songs : req.body.song
            });
                
  console.log(newPlaylist)
        const user = await getOneUser( {email: decoded.email})   
 
        const populateUser = await editUserPlaylalyst( user._id,  {playlist : [newPlaylist._id]}  )  
            if (!populateUser){
                res.status(500).json({message: 'something happened along the line, could not add songs automatically' ,
                request:{
                    type:'POST', 
                    description: 'add songs to playlist',
                    link: `http://localhost:${process.env.PORT}/api/v1/playlist/addsong`
              }
            })
        } 
         
          res.status(200).json({
              message: 'playlist created  successfully',
               playlist:  newPlaylist , 
              request:{
                  type:'POST',
                  description: 'view all songs using this link',
                  link: `http://localhost:${process.env.PORT}/api/songs/allsongs`
              }
          });  
  }; 
 
exports.removeSong = async(req, res, next) =>{
   const playlist = await getAplaylist ({_id : req.params.id} )
   if (!playlist){
      return res.status(400).json({message:'playlist does not exist, enter a valid playlist id',  
    request:{
        type: 'POST',
        message: 'add songs to playlist ',
        url : `http://localhost:${process.env.PORT||5000}/api/v1/playlists/addsong`  
    }
    })  
   } 
   const songArray = playlist.songs 
       const remove = await removeSong(songArray ,  req.body.songId )  
      if (!remove){
        return  res.status(400).json({message :'song does not exist in playlist',  
        request:{
            type: 'POST',
            message: 'add songs to playlist',
            url : `http://localhost:${process.env.PORT||5000}/api/v1/playlists/addsong`  
        }
    })
}
     const newArray = await editPlaylist({_id : req.params.id} , [{ propName : "songs", value: remove}]) 
    if (newArray === null || !newArray){
        return res.status(400).json({message:'couldnt delete song' 
 
    })
}
   res.status(200).json({message:'Song removed successfully',  
   request:{
    type: 'POST',
    message: 'add songs to playlist ',
    url : `http://localhost:${process.env.PORT||5000}/api/v1/playlists/addsong`  
}
    })  
}    
exports.addSong = async(req, res, next)=>{
  const songExists = await getOneSong( {_id: req.body.songId} ); 
  if (songExists === null){
      return res.status(404).json({message:'song does not exist exist' , 
      request:{
        type: 'POST',
        message: 'you can signup using this link ',
        url : `http://localhost:${process.env.PORT||5000}/api/users/signup`  
        } 
    })
}  
const playlist = await getPlaylists({_id: req.params.id});
  if (!playlist){ 
    return res.status(400).json({ message: 'Playlist does not exist' ,
    request:{
        type:'POST',
        description: 'add songs to playlist',
        link: `http://localhost:${process.env.PORT}/api/v1/playlist/addsong`
  }
}) 
  }
       const edited = await  addSong( playlist._id , req.body)
        console.log(edited)
       if ( edited.acknowledged === false || !edited){
          return res.status(500).json({
              message:'something went wrong internally',
              request:{
                  type: 'POST',
                  message: 'you can signup using this link ',
                  url : `http://localhost:${process.env.PORT||5000}/api/users/signup`  
              } 
          })  
      }
          return res.status(201).json({
              message:'song added successfully',
              newdata:edited, 
              request:{
                  type: 'POST',
                  message: 'you can login using this link',
                  url : `http://localhost:${process.env.PORT||5000}/api/users/login`  
              } 
          })
 } 
exports.editPlaylist = async(req, res, next)=>{

 }
exports.deletePlaylist = async(req, res, next) =>{
    const playlist = await getAplaylist ({_id : req.params.id} )
    if (!playlist){
       return res.status(400).json({message:'playlist does not exist, enter a valid playlist id',  
     request:{
         type: 'POST',
         message: 'add songs to playlist ',
         url : `http://localhost:${process.env.PORT||5000}/api/v1/playlists/addsong`  
     }
     })  
    } 

    //const  user = decodeToken(req.headers.authorization).split('')[1] 

        const remove = await deletePlaylist({_id : req.params.id}) 
       if (!remove){
         return  res.status(400).json({message :'something went wrong could not delete playlist'  
     })
 } 
    res.status(200).json({message:'PLaylist deleted successfully',  
    request:{
     type: 'POST',
     message: 'create new playlist ',
     url : `http://localhost:${process.env.PORT||5000}/api/v1/playlists/newplaylist`  
 }
     })  
 }

    