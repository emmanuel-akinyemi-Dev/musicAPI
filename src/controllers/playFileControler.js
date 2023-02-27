const multer = require('multer'); 
const { stat, createReadStream, createWriteStream }= require('fs'); 
const {promisify} = require('util'); 
const {  getAlbums, getOneAlbum,createAlbum,editAlbum,deleteAlbum,addSongToAlbum  } = require('../repository/albumRepo'); 
const Song = require('../models/songSchema');
const Artist = require('../models/artistSchema');  
const { addSong, getSongs, getOneSong,editSong,deleteSong  } = require('../repository/songRepo');
const async = require('async.js');
const { param } = require('../utils/playfile');
const fileInfo = promisify(stat)  
const multiparty = require('multiparty');

exports.uploadFile = async (req, res, next ) =>{
 let form = new multiparty.Form();
 form.on('part', (part)=>{
    part.pipe(createWriteStream('../uploads', part.filename))
    .on('close', ()=>{
        res.writeHead(200).json({Message:'uploaded successfully',
    document :  `./src/uploads/${part.filename}`})
    });
    res.end();
 }) 

 form.parse(req.body.song);
}; 
 
exports.rangeFunction = async(req, res, next) => {
   const file = await getOneSong( {_id : req.params.id} ) ;
    const fileName =  `./${file.song}`; 
  //console.log(fileName) 
  const {size} = await fileInfo(fileName)
  const range  = req.headers.range;
  

if (range){ 
let [start, end] = range.replace(/bytes=/, ' ').split( '-');
  
start = parseInt(start, 10)
end = end ? parseInt(end, 10) : size - 1 ;  
console.log(start, end)
res.writeHead(206, {
    "Content-Length": (start-end) + 1, 
   "Content-Range": `bytes ${start}-${end}/${size}`,
    "Accept-Ranges":"bytes", 
    "Content-type": "audio/mp3"  
})
 
createReadStream(fileName,  {start, end} ).pipe(res);
res.end();
}
else{
    createReadStream(fileName).pipe(res) 
    return res.writeHead(206, {
        "Content-Length": size,
       "Content-type": "audio/mp3", 
    }) ; 
}    
};
 