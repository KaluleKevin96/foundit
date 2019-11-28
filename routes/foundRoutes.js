const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const bcrypt = require('bcryptjs');//importing bcrypt module


router.get('/', (req, res) => {
    res.render('found_form')
})



// submits a  page information
router.post('/', async(req, res) => {
    try{
        res.redirect('/found_form')
    }catch{
        res.send(" Failed to submit, Please try again!")
        // res.redirect('register')
    }
})

module.exports = router;