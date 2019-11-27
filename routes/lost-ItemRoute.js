

//imprting packages
const express = require('express');
const router = express.Router();
const path = require('path');

// importing the model that users shall use
const User = require('../models/lostModel');

//renders a page that shows the Report of the missing items
router.get('/', (req,res)=>{
    res.render('lostItem')

})
//post  route that inserts a user into the database
router.post('/lost-item', (req, res) => {
                         
//creating the model / document 
const user_model = new User({
    Name_of_Document_Owner: req.body.name,
    Enter_Date_of_Birth_On_Document: req.body.date,
    Enter_Clients_Contact: req.body.contact,
    CATEGORY_OF_ITEM: req.body.catergory,
    Passport_Number: req.body.passport,      
});
        
 
});

module.exports = router;