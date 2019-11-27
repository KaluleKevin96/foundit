

//imprting packages
const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', (req,res)=>{
    res.render('index')

})


module.exports = router;