const express = require('express') 
const router = express.Router()
const {getAllProduct,getOneProduct,addProduct, editProduct, removeProduct} = require('../../controllers/marketController')
const {verifyUser, sendToken} = require('../../middleware/auth');
const {uploads} = require('../../middleware/multer')
const {uploadFile , rangeFunction  } = require( '../../controllers/playFileControler');

router.get ('/allproducts', getAllProduct);
router.get ('/play/:id', verifyUser , rangeFunction);
router.get ('/searchproduct',verifyUser,  getOneProduct);
router.post ('/addtomarket', verifyUser,  uploads.single('avatar'), addProduct); 
router.patch ('/editmarket', verifyUser,uploads.single('avatar'), editProduct); 
router.delete ('/deleteproduct',verifyUser,  removeProduct); 
 
   
 
module.exports = router;