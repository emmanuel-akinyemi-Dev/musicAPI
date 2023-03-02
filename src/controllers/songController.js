const multer = require('multer'); 
const dotenv = require('dotenv').config();
const { addSong, getSongs, getOneSong,editSong,deleteSong  } = require('../repository/songRepo');
const {  getAlbums, getOneAlbum,createAlbum,editAlbum,deleteAlbum  } = require('../repository/albumRepo');
const {createArtist, getOneArtist, getArtists,removeArtist, editArtist } = require('../repository/artistRepo');
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
 const album = await getOneAlbum({songAlbum: req.body.songAlbum})
 if (album === null ){
   return res.status(400).json({
    message:'the album does not exist, please start by creating an album with the name',
    request: {
        type: 'POST',
        description: 'create a new album',
        url:  `http://localhost:${process.env.PORT||5000}/api/albums/addalbum` 
        }
     })
 }

 var artist = await  getOneArtist({artistName:req.body.songArtist }) 
 if (artist === null) { 
     var newArtist = await createArtist({
                    artistName: req.body.artistName, 
                    avatar: coverFile ,
                    age: req.body.age, 
                    bio:  req.body.bio 
                    }) 
                    
    if (newArtist === null){
        return response.status(400).json({message: 'Invalid parameters'})
    } 
 } 

const songGenre = req.body.songGenre; 
        const newSong =  await addSong( { 
            songTitle :songTitle ,
            artistName:newArtist.artistName,  
            songAlbum: req.body.songAlbum,
            artistId:newArtist._id, 
            albumName:album.albumName, 
            albumId:album._id, 
            songGenre:songGenre, 
            songYear: req.body.songYear,
            songDuration: req.body.songDuration,
            song: files['song'][0].path,
            songCover: coverFile 
            });
         
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
    