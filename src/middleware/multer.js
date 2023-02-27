const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({ 
    destination: (req, file,cb)=>{
            cb(null,  'src/uploads') },
    filename:(req,file,cb)=>{
         const mainfileame = Date.now()+ path.extname(file.originalname) ;
         cb(null, mainfileame)
    }
    })

    const fileFilter =  (req,file,cb)=>{
        
            if (file.mimetype === 'audio/mp3'||file.mimetype === 'image/jpg'  
            || file.mimetype === 'video/mp3'|| file.mimetype === 'image/jpeg'
            || file.mimetype === 'image/png'){

                cb(null,true); 
            } 

            else{
                cb(new Error('file format not supported'),false);
                 
            }
            
        }  

  

 exports.uploads = multer({storage:storage, limit:{fileSize:1024*1024*9} } );