//this shall have the code that will interact with the database regarding Documents

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DocumentSchema = mongoose.Schema({

    
});


//exporting the model so that it can be accessed by the different routes
module.exports = mongoose.model('Document', DocumentSchema);