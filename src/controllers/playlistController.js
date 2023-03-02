
const {   getSongs, getOneSong,editSong,deleteSong  } = require('../repository/songRepo');  
const {createPlaylist, getPlaylists,getAplaylist,removeSong, addSong} = require('../repository/playlistRepo');
const { addSongToAlbum } = require('../repository/albumRepo');
  


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
  var songExist = await getOneSong( {_id: req.body.song}); 
  if (!songExist) {  
    return res.status(400).json({message: 'Song does not exist'  
    })  
  }    
  const playlist = await getPlaylists({playlistTitle : req.body.playlistTitle});
  if (playlist.length > 0){
    console.log(playlist)
    return res.status(400).json({message: 'Playlist already exist' ,
    request:{
        type:'POST',
        description: 'add songs to playlist',
        link: `http://localhost:${process.env.PORT}/api/v1/playlist/addsong`
  }
})
  }
 
        const newPlaylist =  await createPlaylist( { 
            playlistTitle : req.body.playlistTitle , 
            song : req.body.song
            });
         
          res.status(200).json({
              message: 'playlist created  successfully',
               playlist: newPlaylist,
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
      return res.status(404).json({message:'playlist was not found',  
    request:{
        type: 'POST',
        message: 'you can signup using this link ',
        url : `http://localhost:${process.env.PORT||5000}/api/users/signup`  
    }
    })  
   }

   console.log(playlist)
   //console.log (playlist.song.indexOf(req.body.id) )
   
   res.status(200).json({message:'Song removed successfully',  
    request:{
        type: 'POST',
        message: 'you can signup using this link ',
        url : `http://localhost:${process.env.PORT||5000}/api/users/signup`  
    }
    })  
}    
exports.addSong = async(req, res, next)=>{
  const songExists = await getOneSong( {_id: req.body.song} ); 
  if (songExists === null){
      return res.status(404).json({message:'song does not exist exist',  
      request:{
        type: 'POST',
        message: 'you can signup using this link ',
        url : `http://localhost:${process.env.PORT||5000}/api/users/signup` 

        } 
    })
}  
const playlist = await getPlaylists({_id: req.body.id});
  if (!playlist){ 
    return res.status(400).json({message: 'Playlist already exist' ,
    request:{
        type:'POST',
        description: 'add songs to playlist',
        link: `http://localhost:${process.env.PORT}/api/v1/playlist/addsong`
  }
})
  }
       const edited = await  addSong( {_id :req.params.id}, req.body)
       if (edited === null){
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
    