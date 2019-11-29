const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const bcrypt = require('bcrypt');//importing bcrypt module


router.get('/',checklogged_in, (req, res) => {
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


//custom function that is going to be used as middleware to check if an administrator is logged in
function checklogged_in (req , res , next){
        
    if(req.session.poa){ //session created using normal express session

        return next();

    }else{

        console.log("Please Log In To Continue");
        return res.redirect('/');
    }

}

module.exports = router;