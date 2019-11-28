//this shall have the code that will interact with the database regarding Documents

const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const LostItemSchema = mongoose.Schema({
   
    name:String,
    Enter_Date_of_Birth_On_Document:String,
    Enter_Clients_Contact:String,
    CATEGORY_OF_ITEM:String,
    Passport_Number:String,
});


//exporting the model so that it can be accessed by the different routes
module.exports = mongoose.model('item',LostItemSchema );