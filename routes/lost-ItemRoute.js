

//imprting packages
const express = require('express');
const router = express.Router();
const path = require('path');

// importing the model that users shall use
const User = require('../models/lostModel');

//renders a page that shows the Report of the missing items
router.get('/', (req,res)=>{
    res.render('lostItem' , { title : "REPORT LOST ITEM" })

})
//renders the data base form of the missing items
router.get('/all-items', async(req,res)=>{
    
   var users = await User.find();

    res.render('layout2' , { title : "REPORT LOST ITEM" , users:users})

})
//post  route that inserts a user into the database
router.post('/', async(req, res) => {
                         
//creating the model / document 
const user_model = new User({
    Name_of_Document_Owner: req.body.name,
    Enter_Date_of_Birth_On_Document: req.body.date,
    Enter_Clients_Contact: req.body.contact,
    CATEGORY_OF_ITEM: req.body.catergory,
    Passport_Number: req.body.passport,      
});
try{

    await user_model.save();

    res.redirect("/lostitem/all-items");

}
catch(error){

    console.log(error);

    res.status(500).send("Form record Failed");
}

//route to load page that shows missing form report
// router.get('/all-items' , async(req,res) => {


// });

        
 
});

module.exports = router;