const multer = require('multer');
const {createArtist, getOneArtist, getArtists,removeArtist, editArtist,addAlbumToArtist } = require('../repository/artistRepo');
 

 

exports.getAllArtist = async (req, res, next ) =>{

    const Artists = await  getArtists({}); 
   
if (Artists === null || Artists.length < 1 ){ 
    return res.status(404).json({message:'no Artist found', 
    request:{
        type: 'POST', 
        description: 'find all available artists using this link below',
        url: `http://localhost:${process.env.PORT||5000}/api/artist` 
    }   
    });   
}
 
res.status(200).json({
    message: 'Artists found',
    Artists: Artists
}); 
}; 
exports.getOneArtist = async(req, res, next) => {
    const artist = await getArtists({artistName: req.body.artistName}) 

    if (artist===null|| artist.length < 1) {
       return res.status(401).json({message:'Artist does not exist',  
    });         
  }
res.status(200).json({
    message: 'Artists found',
    Artists: artist
})
}
exports.addArtist = async (req, res , next)=>{ 
  
  var artistExist = await getOneArtist( {artistName: req.body.artistName}); 
  if (artistExist) {  
    return res.status(400).json({message: 'Artist already exist' ,
    request:{
        type:'POST',
        description: 'login using this link',
        link: `http://localhost:${process.env.PORT}/login`
    }
    })  
  }    
  const file = req.file;
  if (file){
    var avatar = file.path
  }
  else{
     avatar ='https://i.ibb.co/5Y3m5Y1/default.jpg' 
  } 
  
        const newArtist =  await createArtist( { 
          artistName : req.body.artistName, 
          bio : req.body.bio,
          avatar:  avatar,
          age: req.body.age ,
          albums: req.body.album 
      })   
          res.status(200).json({
              message: 'user created successfully',
              Artist: newArtist,
              request:{
                  type:'POST',
                  description: 'login using this link',
                  link: `http://localhost:${process.env.PORT}/login`
              }
          }) 
 }
  
exports.removeArtist = async(req, res, next) =>{
  const artistExists = await getArtists( {artistName: req.body.artistName})
   console.log(artistExists); 
  if (artistExists ){
          removeArtist( {id: artistExists._id}) 
      res.status(200).json({message:'Artist removed successfully',  
       request:{
         type: 'POST',
         message: 'you can signup using this link ',
         url : `http://localhost:${process.env.PORT||5000}/api/users/signup` 

     }}) 
     } 
 else{ 
  res.status(404).json({message:'Artist does not exist',
  request:{
      type: 'POST',
      message: 'you can login using this link ',
      url : `http://localhost:${process.env.PORT||5000}/api/users/login` 
      }   
  })   
 }
}  
exports.editArtist = async(req, res, next)=>{
    const incoming = req.body 
    const artistName  = incoming[0].value
  const artistExists = await getOneArtist( {artistName: artistName})
  if (artistExists === null){
      return res.status(404).json({message:'user does not exist',  
      request:{
        type: 'POST',
        message: 'you can signup using this link ',
        url : `http://localhost:${process.env.PORT||5000}/api/users/signup` 

    }}) 
  }   
       const edited = await  editArtist(artistExists._id, req.body)
       if (edited === null){
          return res.status(500).json({
              message:'something went wrong internally',
              request:{
                  type: 'POST',
                  message: 'you can find information about all artist using this link ',
                  url : `http://localhost:${process.env.PORT||5000}/api/artist/`  
              } 
          }) 
      }
          return res.status(201).json({
              message:'artist modified successfully',
              newdata:edited,
              request:{
                  type: 'POST',
                  message: 'you can login using this link',
                  url : `http://localhost:${process.env.PORT||5000}/api/artist/searchartist`,
                 dependencies: {
                    artistName:'vallid artist name string' 
                 }  
              } 
          })
      }  
 exports.addAlbum = async(req, res, next)=>{
        const incoming = req.body 
       const artistExist = await getOneArtist({_id: incoming.artistId})  
       if (!artistExist ){
        return res.status(400).json({message: 'Artist does not exist'});
        } 
        const updateArtist = await  addAlbumToArtist (artistExist._id, {albums:incoming.albumId}) 
        if (!updateArtist){
           return res.status(500).json({message: 'couldnt add album to artist'});
           }
              return res.status(201).json({
                  message:'artist modified successfully',
                  newdata:updateArtist,
                  request:{
                      type: 'POST',
                      message: 'you can login using this link',
                      url : `http://localhost:${process.env.PORT||5000}/api/artist/searchartist`,
                     dependencies: {
                        artistName:'vallid artist name string' 
                     }  
                  } 
              })
          } 
          
 