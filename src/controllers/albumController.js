const multer = require('multer'); 
const {  getAlbums, getOneAlbum,createAlbum,editAlbum,deleteAlbum,addSongToAlbum  } = require('../repository/albumRepo'); 
const Song = require('../models/songSchema');
const Artist = require('../models/artistSchema');  
const { addSong, getSongs, getOneSong,editSong,deleteSong  } = require('../repository/songRepo');
const async = require('async.js');
 

exports.getAllAlbum= async (req, res, next ) =>{

    const albums = await getAlbums({}); 
  
if (albums === null || albums.length < 1 ){ 
    return res.status(404).json({message:'no albums found', 
    request:{
        type: 'POST', 
        description: 'create albums using this link below',
        url: `http://localhost:${process.env.PORT||5000}/api/albums/addalbums` 
    }   
    });   
}
 
res.status(200).json({
    message: 'albums found',
    albums: albums
}); 
}; 
exports.getOneAlbum= async(req, res, next) => {
    const album = await getAlbums({albumName: req.body.albumName}) 

    if (album===null|| album.length < 1) {
       return res.status(401).json({message:'album does not exist',  
    });         
  }
res.status(200).json({
    message: 'albums found',
    album: album
})
}
exports.addAlbum= async (req, res , next)=>{ 
  
  var albumExist = await getOneAlbum( {albumName: req.body.albumName}); 
  if (albumExist) {  
      return res.status(400).json({message: 'Album already exists', request:{
        type: ' POST',
        description: 'add songs to album',
        url: 'http://localhost:$process.env.PORT/api/album/addsong'

      }
      })
  }   
  const file = req.file;
  if (file){
    var avatar = file.path
  }
  else{
    avatar = 'https://i.ibb.co/5Y3m5Y1/default.jpg' 
  }
        const newalbum =  await createAlbum( { 
              albumName: req.body.albumName,
              albumYear: req.body.albumYear,
              albumCover : avatar,
        })


        res.status(200).json({ 
          message: 'Album created successfully',
              album: newalbum , 
              request:{
                  type:'POST',
                  description: 'check albums details using this link',
                  link: `http://localhost:${process.env.PORT}/api/albums/`
              }
          })  
 } 
exports.removeAlbum= async(req, res, next) =>{
  const albumExists = await getAlbums( {albumName: req.body.albumName}) 
  if (albumExists ){
          deleteAlbum( {id: albumExists._id}) 
      res.status(200).json({message:'album removed successfully',
      request:{
        type: 'POST',
        message: 'you can create an album using this link ',
        url : `http://localhost:${process.env.PORT||5000}/api/album/addalbum` 
        } 
  }) 
     } 
 else{ 
  res.status(404).json({message:'album does not exist',
  request:{
      type: 'POST',
      message: 'you can create an album using this link ',
      url : `http://localhost:${process.env.PORT||5000}/api/album/addalbum` 
      }   
  })   
 }
}  
exports.editAlbum= async(req, res, next)=>{
  if (req.body.albumName === { } || req.body === null){
    return res.status(400).json({message:'pass in a valid input',  
      request:{
        type: 'POST',
        message: 'you can get information about album using this link ',
        url : `http://localhost:${process.env.PORT||5000}/api/album/searchalbum`,
        dependables:{
            albumName:'string'  
        }  
    }})  
  }
   const incoming = req.body 
   const albumName = incoming[0].value
  const albumExists = await getOneAlbum( {albumName:  albumName})
 
  if (albumExists === null){
      return res.status(404).json({message:'album not exist',  
      request:{
        type: 'POST',
        message: 'you can get information about album using this link ',
        url : `http://localhost:${process.env.PORT||5000}/api/album/`,
        dependables:{
            albumName:'string' 
        }  
    }}) 
  }  
      
       const edited = await  editAlbum(albumExists._id,  req.body  )
       if (edited === null){
          return res.status(500).json({
              message:'something went wrong internally',
              request:{
                type: 'POST',
                message: 'you can get information about album using this link',
                url : `http://localhost:${process.env.PORT||5000}/api/album/`,
                dependables:{
                    albumName:'string'  
                }  
            } 
          }) 
      }
          return res.status(201).json({
              message:'album updated successfully',
              newdata:edited,
              request:{
                type: 'POST',
                message: 'you can get information about album using this link ',
                url : `http://localhost:${process.env.PORT||5000}/api/album/`,
                dependables:{
                    albumName:'string'  
                }   
              } 
          })
 }
 exports.addSongtoAlbum = async(req, res, next)=>{ 
  if( req.body.albumName){
    var albumExists = await getOneAlbum( {albumName: req.body.albumName})
 
  }
  else{
      albumExists = await getOneAlbum( {_id: req.body.albumId})
 
  }
  
  if (albumExists === null){
      return res.status(404).json({message:'album not exist',  
      request:{
        type: 'POST',
        message: 'you can get information about album using this link ',
        url : `http://localhost:${process.env.PORT||5000}/api/album/`,
        dependables:{
            albumName:'string'  
        }  
    }}) 
  }    
       const edited = await  addSongToAlbum(albumExists.songId, { songId: req.body.songId}  )
       if (edited === null){
          return res.status(500).json({
              message:'something went wrong internally',
              request:{
                type: 'POST',
                message: 'you can get information about album using this link ',
                url : `http://localhost:${process.env.PORT||5000}/api/album/`,
                dependables:{
                    albumName:'string' 
                }  
            } 
          }) 
      }
          return res.status(201).json({
              message:'album updated successfully',
              newdata:edited,
              request:{
                type: 'POST',
                message: 'you can get information about album using this link ',
                url : `http://localhost:${process.env.PORT||5000}/api/album/`,
                dependables:{
                    albumName:'string'  
                }   
              } 
          })
 }