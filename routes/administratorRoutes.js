/* ---------------- CONTAINS ALL ROUTES TO DO WITH ADMINISTRATORS-------------*/
//importing important packages that shall be used
const express = require('express');
const router = express.Router();
const path = require('path');

const bcrypt = require('bcrypt');

// importing the model that admins shall use
const Administrator = require('../models/AdministratorModel');

//current date
const current_date = new Date();


//route to load the register administrator form
router.get('/register_administrator_form' , (req,res) => {

    //incoporate session code later

    res.render('administrators/register_administrator' , {
        
        title:"REGISTER ADMINISTRATOR",
    })

});

//POST route to insert admin into the database
router.post('/register_admin' , async(req,res) => {

    //incoporate session code later

    //generate secondary id (poa id)
var admin_id , autonumber , current_year ;

    current_year = current_date.getFullYear(); //getting the current year

    //first , get the most recent autonumber
    var most_recent = await Administrator.findOne().sort({autonumber:-1}).exec();

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
        admin_id = "A"+current_year.toString().slice(1,4)+"000" +autonumber ;
    }else if(autonumber >= 10){
        admin_id = "A"+current_year.toString().slice(1,4)+"00" +autonumber ;
    }else if(autonumber >= 100){
        admin_id = "A"+current_year.toString().slice(1,4)+"0" +autonumber ;
    }else if(autonumber >= 1000){
        admin_id = "A"+current_year.toString().slice(1,4)+"" +autonumber ;
    }

    const inserted_administrator = new Administrator({

        admin_id : admin_id,
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        phone_contact : req.body.phone_contact,
        username: req.body.username,
        password : req.body.password,
        autonumber : autonumber,
        year : current_year,
        status : "active",
        position : "admin",
        added_by : (req.session.user) ? req.session.user.admin_id : admin_id,
        added_on : Date.now()

    });

    try{

        await inserted_administrator.save();

        // res.send("ADMIN successfully registered");

        /* res.render("administrators/all_administrators" , {
            
            title : "ALL REGISTERED ADMINISTRATORS"
        }) */

        res.redirect("/administrators/all_administrators");

    }
    catch(error){

        console.log(error);

        res.status(500).send("Registration Failed. Error : "+error);
    }


});

//route to load page that shows all administrators
router.get('/all_administrators' , async(req,res) => {

    //incoporate session code later

    var all_administrators = await Administrator.find();

    res.render('administrators/all_administrators' , {
        
        title:"ALL REGISTERED ADMINISTRATORS",
        all_administrators : all_administrators
    })

});


module.exports = router;