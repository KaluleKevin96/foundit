const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const bcrypt = require('bcryptjs');//importing bcrypt module






//display home page
//render  your pug form   -- a get method first, shows ur page 
router.get('/', (req, res) => {
    res.render('index')
})



// submits a login page information
router.post('/', async(req, res) => {
    try{
        res.redirect('index')
    }catch{
        res.send(" Failed, Please try again!")
        // res.redirect('register')
    }
})

module.exports = router;