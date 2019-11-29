

//imprting packages
const express = require('express');
const router = express.Router();
const path = require('path');

// importing the model that Lostitemss shall use
const Lostitems = require('../models/lostModel');

//renders a page that shows the Report of the missing items
router.get('/', checklogged_in , (req,res)=>{
    res.render('lostItem' , { 
        title : "REPORT LOST ITEM",
        poa : req.session.poa

})

})
//renders the data base form of the missing items
router.get('/all_items', checklogged_in, async(req,res)=>{
    
   var lostitems = await Lostitems.find();

    res.render('layout2' , { title : "ALL REPORTED LOST DOCUMENTS" , lostitems:lostitems})

})

//post  route that inserts a lost item into the database
router.post('/', async(req, res) => {
                         
//creating the model / document 
const Lostitems_model = new Lostitems({
    Name_of_Document_Owner: req.body.name,
    Enter_Date_of_Birth_On_Document: req.body.date,
    Enter_Clients_Contact: req.body.contact,
    CATEGORY_OF_ITEM: req.body.catergory,
    Passport_Number: req.body.passport,      
});
try{

    await Lostitems_model.save();

    res.redirect("/lostitem/all_items");

}
catch(error){

    console.log(error);

    res.status(500).send("Form record Failed");
}

//route to load page that shows missing form report
// router.get('/all-items' , async(req,res) => {


// });

        
 
});


//custom function that is going to be used as middleware to check if an administrator is logged in
function checklogged_in (req , res , next){
        
    if(req.session.poa){ //session created using normal express session

        return next();

    }else{

        console.log("Please Log In To Continue");
        return res.redirect('/');
    }

}

//custom function that is going to be used as middleware to check if an administrator is not logged in
//so that they are not allowed to go to the log in form
function checklogged_out (req , res , next){
    
  if(req.session.poa){ //session created using normal express session

        console.log("Please Log Out To Continue");
        return res.redirect('/poa');

    }else{

        return next();           
    }

}

//custom function that is going to be used as middleware to check if an administrator is logged in
function checkAdminlogged_in (req , res , next){

    if(req.isAuthenticated()){ //if Lostitems is authenticated then go ahead and let them see the page

        return next();

    }else{

        console.log("Please Log In To Continue");
        return res.redirect('/');
    }

}

//custom function that is going to be used as middleware to check if an administrator is not logged in
//so that they are not allowed to go to the log in form
function checkAdminlogged_out (req , res , next){
    
    if(req.isAuthenticated()){ //if Lostitems is authenticated then go ahead and let them see the page

        console.log("Please Log Out To Continue");
        return res.redirect('/administrators/all_adminstrators');
        

    }else{

        return next();           
    }

}
module.exports = router;