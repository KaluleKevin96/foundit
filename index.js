// console.log("Hello World");/
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); //requiring the body parse package (module)
const session = require('express-session'); //importing express session package

// const back = require('express-back'); //express back module 
// const multer = require('multer');
// const fs = require('fs'); //importing the files system 

//initialising the app
const app = express();
//requiring the mongoose package to communicate with mondoDB
const mongoose = require('mongoose');

//importing the Documents model 
const User = require('./models/DocumentsModel');

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

// //middleware to tell the application to use session
// app.use(session({
//     secret : "super secret",
//     resave : true,
//     saveUninitialized : false
// }))

// app.use(back());

// //middleware to assign session user object to locals of the app
// app.use((req , res , next) => {

//     if(req.session.user){

//         app.locals.loggedin_user = req.session.user;
//     }

//     next();
// })

//connect to databese
mongoose.connect('mongodb://localhost:27017/found-it', { useNewUrlParser: true , useUnifiedTopology: true , useFindAndModify: false }, () => {
    console.log("Connected to database");
});


//IMPORTING ROUTES 
const documentRoute = require('./routes/documentRoutes');

const registrationRoute = require('./routes/regRoute')
app.use('/register', registrationRoute);

//importing lost item routes:
const lost_ItemRoute = require('./routes/lost-ItemRoute')
app.use('/lostitem', lost_ItemRoute);

//importing  post 



//using the imported User Route
// app.use('/documents', documentRoute);


/* ------------------------- END OF MIDDLEWARE ----------------------------------------------------*


//ROUTES
/*------------------------------------------------------------------------------------------------------------------------------*/
// app.get('/', async(req, res) => {

//     //initial index function

//     res.render("index" , { title : "LOST AND FOUND"})
   
// });

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

// /*----------------------------------------------------------------------------------------------------------------------------------*/

// //error page handling for non existent paths
// app.get('*', (req, res) => {

//     res.send("<h1> ERROR!! ERROR!! <br/><br/> This Page Does Not Exist </h1>");
//     //<h1> ERROR!! ERROR!! <br/><br/> This Page Does Not Exist </h1>
// })




//SERVER LISTEN
//telling the server to listen on port 3000
app.listen(3000, function() {

    console.log("Listening on port 3000")
});