/* ---------------- CONTAINS ALL ROUTES TO DO WITH POINTS OF ACCESS -------------*/
//importing important packages that shall be used
const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');

// importing the model that poas shall use
const Poa = require('../models/PoaModel');

//current date
const current_date = new Date();


//route to load the register point of access form
router.get('/register_poa_form' , (req,res) => {

    //incoporate session code later

    res.render('poa/register_poa' , {
        
        title:"REGISTER POINT OF ACCESS",
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

        res.send("POA successfully registered");

    }
    catch(error){

        console.log(error);

        res.status(500).send("Registration Failed");
    }


});

//route to load page that shows all poas
router.get('/all_poas' , async(req,res) => {

    //incoporate session code later

    var all_poas = await Poa.find();

    res.render('poa/all_poas' , {
        
        title:"ALL POINTS OF ACCESS",
        all_poas : all_poas
    })

});


module.exports = router;