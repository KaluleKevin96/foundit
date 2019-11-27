/* ---------------- CONTAINS ALL ROUTES TO DO WITH DOCUMENTS -------------*/
//importing important packages that shall be used
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const bcrypt = require('bcryptjs');//importing bcrypt module

// importing the model that users shall use
const Document = require('../models/DocumentsModel');

//setting destination path for files when uploaded
const storage = multer.diskStorage({
    destination:  './public/uploads/document_images',
    
    filename: function (req, file, cb) {
      //cb(null, req.body.last_name +'_'+req.body.first_name+'-'+file.fieldname + '-'+ Date.now() + path.extname(file.originalname));

      cb(null, req.body.last_name +'_'+req.body.first_name+'-'+file.fieldname + '-'+ Date.now() + path.extname(file.originalname));
    }
  })
   
//initialising the multer upload object with the storage configurations
  const upload = multer({ 
      storage: storage,
      limits : { fileSize : 2000000},
      fileFilter : function(req, file , cb){
        //custom function to check file type  
        check_ImageFileType (file , cb);
      }
 }).single('document_image');

 const edit_upload = multer({ 
    storage: storage,
    limits : { fileSize : 2000000},
    fileFilter : function(req, file , cb){
      //custom function to check file type  
      check_ImageFileType (file , cb);
    }
})

 /* --------------------------- BEGINNING OF CUSTOM FUNCTION TO CHECK THE IMAGE FILETYPE -----------------------------------------*/
 //custom function to check file mime type and extension
 function check_ImageFileType (file , cb){
    //Allowed extensions
    const filetypes = /jpeg|jpg|png|gif/

    //check extentions 
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    //Check Mime types
    const mimetype = filetypes.test(file.mimetype);

    if(extname && mimetype) {
//if both are true meaning that the file is correct file extention and mime type
        return cb (null , true);

    }else {

        cb('Error : Only Images can be uploaded !!');
    }
 }

 /* --------------------------- END OF CUSTOM FUNCTION -----------------------------------------*/



module.exports = router;