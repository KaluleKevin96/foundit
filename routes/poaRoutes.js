/* ---------------- CONTAINS ALL ROUTES TO DO WITH POINTS OF ACCESS -------------*/
//importing important packages that shall be used
const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

// importing the model that poas shall use
const Poa = require('../models/PoaModel');

//current date
const current_date = new Date();

/*const passport = require('passport'); //importing passport
const PoaLocalStrategy = require('passport-local').Strategy;

passport.use('poa-local' , new PoaLocalStrategy(Poa.authenticate()));
 passport.serializeUser(Poa.serializeUser());
passport.deserializeUser(Poa.deserializeUser()); */

/* passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    Poa.findById(id, function(err, user) {
      done(err, user);
    });
  }); */

  //poa index route 
router.get('/', checklogged_in , (req,res) => {

    //incoporate session code later

    res.render('poa/poa_landing_page' , {
        
        title:"POINT OF ACCESS",
        user : req.user,
        poa : req.session.poa
    })

});

//route to load the register point of access form
router.get('/register_poa_form', checkAdminlogged_in , (req,res) => {

    //incoporate session code later

    res.render('poa/register_poa' , {
        
        title:"REGISTER POINT OF ACCESS",
        user : req.user
    })

});

//POST route to insert point of access into the database
router.post('/register_poa' , async(req,res) => {

    //incoporate session code later

    //generate secondary id (poa id)
var poa_id , autonumber , current_year , email ;

    current_year = current_date.getFullYear(); //getting the current year

    //first , get the most recent autonumber
    var most_recent = await Poa.findOne().sort({autonumber:-1}).exec();

    // console.log(most_recent);

    if(most_recent == undefined || most_recent.length == 0){
        //if there is no record, meaning its the first record to be stored

        autonumber = 0;        

    }else{
        //if there is a record then get that auto number and year

        if(current_year == ( most_recent.year + 1)){
            //if the current year is one more than the most recent year recorded in the database
            //that means its a new year and so the auto number is reset to 1

            autonumber = 0;

        }else{

            autonumber = most_recent.autonumber;
        }

    }
    //increment the returned autonumber by 1
    autonumber += 1;

    if(autonumber < 10){
        poa_id = "POA"+current_year.toString().slice(1,4)+"000" +autonumber ;
    }else if(autonumber >= 10){
        poa_id = "POA"+current_year.toString().slice(1,4)+"00" +autonumber ;
    }else if(autonumber >= 100){
        poa_id = "POA"+current_year.toString().slice(1,4)+"0" +autonumber ;
    }else if(autonumber >= 1000){
        poa_id = "POA"+current_year.toString().slice(1,4)+"" +autonumber ;
    }

    if(req.body.email == '' || req.body.emai == undefined){

        email = "None Registered";
    }
    else{

        email = req.body.email;
    }

    const inserted_poa = new Poa({

        poa_id : poa_id,
        poa_name : req.body.poa_name,
        location : req.body.poa_location,
        POA_email : email,
        POA_contact : req.body.poa_contact,
        person_in_charge : req.body.person_in_charge,
        username: req.body.username,
        password : req.body.password,
        autonumber : autonumber,
        year : current_year,
        status : "active",
        position : "poa",
        added_by : "Super Admin",
        added_on : Date.now()

    });

    try{

        await inserted_poa.save();

        // res.send("POA successfully registered");
        res.redirect('/poa/all_poas');

    }
    catch(error){

        console.log(error);

        res.status(500).send("Registration Failed");
    }


});

//other POST ROUTE to log the poas in 
router.post('/poa_login', async (req, res) => {

        
    // submits a login page information
        try{
            const poa = await Poa.authenticate(req.body.username, req.body.password);
    //console.log(poa);
    
           //create session
           req.session.poa = poa ;
            
           //redirect to the point of access landing page
            return res.redirect("/poa/poa_landing_page")
    
        }catch(err){
    
            //res.send("Login Failed")
    //if failed then take the user back to the login page
            res.render('index' , {
                title: "FOUND-IT",
                error_message : err
            });
        }
           
    });


//route to load page that shows all poas
router.get('/all_poas', checkAdminlogged_in , async(req,res) => {

    //incoporate session code later

    var all_poas = await Poa.find();

    res.render('poa/all_poas' , {
        
        title:"ALL POINTS OF ACCESS",
        all_poas : all_poas,
        user : req.user
    })

});

//custom function that is going to be used as middleware to check if an administrator is logged in
function checklogged_in (req , res , next){
        
        if(req.session.poa){ //session created using normal express session

            return next();

        }else{

            console.log("Please Log In To Continue");
            return res.redirect('/administrators/admin_login');
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

    var all_admins = Administrator.find();
    
    if(all_admins == undefined || all_admins == null || all_admins.length == 0){ //if it is first time setup and the first administrator is going to register

        next();

    }else{
        
        if(req.isAuthenticated()){ //if user is authenticated then go ahead and let them see the page

            return next();

        }else{

            console.log("Please Log In To Continue");
            return res.redirect('/administrators/admin_login');
        }
    }
}

//custom function that is going to be used as middleware to check if an administrator is not logged in
//so that they are not allowed to go to the log in form
function checkAdminlogged_out (req , res , next){
        
        if(req.isAuthenticated()){ //if user is authenticated then go ahead and let them see the page

            console.log("Please Log Out To Continue");
            return res.redirect('/administrators/all_administrators');
            

        }else{

            return next();           
        }
    
}

module.exports = router;