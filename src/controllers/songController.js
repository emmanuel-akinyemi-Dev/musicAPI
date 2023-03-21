const multer = require('multer'); 
const dotenv = require('dotenv').config();
const { addSong, getSongs, getOneSong,editSong,deleteSong  } = require('../repository/songRepo');
const {  getAlbums, getOneAlbum,createAlbum,editAlbum,deleteAlbum,addSongToAlbum  } = require('../repository/albumRepo');
const {createArtist, getOneArtist, getArtists,removeArtist,addAlbumToArtist , editArtist } = require('../repository/artistRepo');
const { response } = require('express');
 

exports.getAllSongs = async (req, res, next ) =>{

    const songs = await getSongs({}); 
  
if (songs === null || songs.length < 1 ){ 
    return res.status(404).json({message:'no Song found', 
    request:{
        type: 'POST', 
        description: 'upload Songs using this link below',
        url: `http://localhost:${process.env.PORT||5000}/api/songs/upload` 
    }   
    });   
}
 
res.status(200).json({
    message: 'Songs found',
    Songs: songs
}); 
}; 
exports.findOneSong = async(req, res, next) => {
    const song = await getSongs({songTitle: req.body.songTitle}) 

    if (song===null|| song.length < 1) {
       return res.status(401).json({message:'Song does not exist',  
    });         
  }
res.status(200).json({
    message: 'Songs found',
    Songs: song
})
}
exports.addSong = async (req, res , next)=>{ 
    const files = req.files;  
    if (files['songCover'])  {
        var coverFile = files['songCover'][0].path; 
        
    }
    else{
      coverFile = 'https://i.ibb.co/5Y3m5Y1/default.jpg' 
    }
  
  var songExist = await getOneSong( {songTitle: req.body.songTitle}); 
  if (songExist) {  
    return res.status(400).json({message: 'Song already exist' ,
    request:{
        type:'POST',
        description: 'see all songs',
        link: `http://localhost:${process.env.PORT}/api/songs/allsongs`
    }
    })  
  }  
const songTitle  = req.body.songTitle;
 const album = await getOneAlbum({albumName: req.body.songAlbum})
 if (!album || album === null){
    var newAlbum = await createAlbum({
        albumCover :req.body.albumCover,
        albumName : req.body.songAlbum,
        artistName : req.body.artistName,
        songId : req.body.songId,
        albumYear :req.body.albumYear, 
    });
    console.log(`created album : ${newAlbum}`)
    
 }
else{
    newAlbum = album
    console.log(`read album : ${newAlbum}`)
} 
 var artist = await  getOneArtist({artistName : req.body.songArtist })  
 if (artist === null || !artist) { 
     var newArtist = await createArtist({
                    artistName: req.body.artistName, 
                    avatar: coverFile ,
                    albums: newAlbum._id,
                    age: req.body.artistAge, 
                    bio: req.body.artistBio 
                    }) ;

                    console.log(`created artist: ${newArtist}`)     
    if (newArtist === null || !newArtist){
        return response.status(400).json({message: 'Invalid parameters, please check your imputs and try again'})
    } 
 }
 else{
    newArtist = artist 
    console.log(`read artist : ${newArtist}`)
 } 
  
const songGenre = req.body.songGenre; 
         const newSong =  await addSong( { 
            songTitle : songTitle ,
            artistName: newArtist.artistName,  
            songAlbum: req.body.songAlbum,
            artistId: newArtist._id, 
            albumName: req.body.albumName, 
            albumId: newAlbum._id, 
            songGenre: songGenre, 
            songYear: req.body.songYear,
            songDuration: req.body.songDuration,
            song: files['song'][0].path,
            songCover: coverFile 
            });
         
         if(!newSong){ 
         return response.status(500).json({message: 'something went wrong'});

        } 
      const updateAlbum = await addSongToAlbum( newAlbum._id , { songId : [newSong._id]})
      if (!updateAlbum){
     return response.status(500).json({message: 'couldnt add song to album'});
     }
     const updateArtist = await  addAlbumToArtist(newArtist._id, {albums:[newAlbum._id]}) 
     if (!updateArtist){
        return response.status(500).json({message: 'couldnt add album to artist'});
        }
          res.status(200).json({
              message: 'Song added successfully',
               song: newSong,
              request:{
                  type:'POST',
                  description: 'view all songs using this link',
                  link: `http://localhost:${process.env.PORT}/api/songs/allsongs`
              }
          });  
 }; 

exports.removeSong = async(req, res, next) =>{
  const songExists = await getSongs( {songTitle: req.body.songTitle})
   
  if (songExists === null){ 
    res.status(404).json({message:'Song does not exist',
    request:{
        type: 'POST',
        message: 'you can login using this link ',
        url : `http://localhost:${process.env.PORT||5000}/api/users/login` 
        }   
    }) 
} 
    await deleteSong( {id: songExists._id}); 
   res.status(200).json({message:'Song removed successfully',  
    request:{
        type: 'POST',
        message: 'you can signup using this link ',
        url : `http://localhost:${process.env.PORT||5000}/api/users/signup`  
    }
    })  
}    
exports.editSong = async(req, res, next)=>{
  const songExists = await getOneSong( {songTitle: req.body.songTitle} ); 
  if (songExists === null){
      return res.status(404).json({message:'user does not exist',  
      request:{
        type: 'POST',
        message: 'you can signup using this link ',
        url : `http://localhost:${process.env.PORT||5000}/api/users/signup` 

        } 
    })
}  
       const edited = await  editSong(songExists._id, req.body)
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
              message:'password changed successfully',
              newdata:edited,
              request:{
                  type: 'POST',
                  message: 'you can login using this link',
                  url : `http://localhost:${process.env.PORT||5000}/api/users/login`  
              } 
          })
 } 
    