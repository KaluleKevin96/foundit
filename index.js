// console.log("Hello World");/
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); //requiring the body parse package (module)
const session = require('express-session'); //importing express session package
const bcrypt = require('bcryptjs');
const back = require('express-back'); //express back module 
const multer = require('multer');
const fs = require('fs'); //importing the files system 

//initialising the app
const app = express();
//requiring the mongoose package to communicate with mondoDB
const mongoose = require('mongoose');

//importing the Documents model 
const User = require('./models/IndexModel');
const Document = require('./models/DocumentsModel');

//MIDDLEWARES
//defining what the app should use for the body parser
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json());

//declaring the path where the views shall be stored
app.set('views', path.join(__dirname, 'views'));

//defining the view enegine to be pug
app.set('view engine', 'pug');

//defining the 'public' folder to be static
app.use(express.static(path.join(__dirname, 'public')));


//connect to databese
mongoose.connect('mongodb://localhost:27017/found-it', { useNewUrlParser: true , useUnifiedTopology: true , useFindAndModify: false }, () => {
    console.log("Connected to database");
});


//IMPORTING ROUTES 
const IndexRoute = require('./routes/indexRoutes');

//using the imported homepage Route
app.use('/index', IndexRoute);
const documentRoutes = require('./routes/documentRoutes');
const poaRoutes = require('./routes/poaRoutes');
const administratorRoutes = require('./routes/administratorRoutes');

//using the imported Documents Route
app.use('/documents', documentRoutes);

//using the imported Point of access Routes
app.use('/poa', poaRoutes);

//using the imported Administrator Routes
app.use('/administrators', administratorRoutes);

const foundRoute = require('./routes/foundRoutes');
app.use('/found_form', foundRoute);

/* ------------------------- END OF MIDDLEWARE ----------------------------------------------------*


//ROUTES
/*------------------------------------------------------------------------------------------------------------------------------*/
app.get('/', async(req, res) => {

    //initial index function

    res.render("index" , { title : "FOUND-IT"})
   
});

// app.get('/logout', (req, res) => {

//     if(req.session.user){
//         try{

//             req.session.destroy(() => {

//                 return res.redirect("/users/user_login");
//             });
    

//         }catch(err){

//             res.send("Failed to logout. \n " + err.toString())

//         }
        
//     }else{

//         return res.redirect("/users/user_login");
//     }
// });

/*----------------------------------------------------------------------------------------------------------------------------------*/

//error page handling for non existent paths
app.get('*', (req, res) => {

    res.status(404).send();
    //<h1> ERROR!! ERROR!! <br/><br/> This Page Does Not Exist </h1>
})


//SERVER LISTEN
//telling the server to listen on port 3000
app.listen(3000, function() {

    console.log("Listening on port 3000")
});