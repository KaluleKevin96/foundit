//this shall have the code that will interact with the database regarding Documents

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DocumentSchema = mongoose.Schema({
    POA_id:String,
    location:String,
    POA_email:String,
    POA_contact:String,
    in_Charge:String,
    username:String,
    password:String,
    status:String,
    added_on:String,
    updated_on:String,
});


//exporting the model so that it can be accessed by the different routes
module.exports = mongoose.model('Document', DocumentSchema);