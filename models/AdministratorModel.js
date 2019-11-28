//this shall have the code that will interact with the database regarding Administrators
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdministratorSchema = mongoose.Schema({
    admin_id:{
        type:String,
        unique: true,
        required: [true , "Generate unique secondary Id"]
    },
    first_name:{
        type:String,
        required: [true , "Please Enter The First Name"]
    },
    last_name:{
        type:String,
        required: [true , "Please Enter The Last Name"]
    },
    email:{
        type:String,
        unique : [true , "This email has already been registered with another Administrator" ],
        required : [true , "Please Enter The Email of The Registered Administrator"]       
    },
    phone_contact:{
        type:String,
        unique: [true, "This contact has been registered for another Administrator"],
        required: [true , "Please Enter The Phone Contact of The Point Of Access"]
    },
    username:{
        type:String,
        unique: [true, "This username has been registered for another Administrator"],
        required: [true , "Please Enter The Username for Administrator"]
    },
    password:{
        type:String,
        required: [true , "Please Enter A Password for The Administrator"]
    },
    status:{
        type:String,
        default: "active"
    },
    position : {
        type:String,
        required: [true , "What position does this record hold in the application"]
    },
    added_on:{
        type:Date,
        default: Date.now(),
    },
    added_by:{
        type:String,
        required: [true , "Who has registered this Point Of Access"]
    },
    updated_on:{
        type:Date,
    },
    autonumber:{
        type:Number,
        required : [true , "Autonumber is required"]
    },
    year:{
        type:Number,
        required : [true , "Year is required"]
    }

});


//hashing the password before it is saved
AdministratorSchema.pre('save' , function(next) {

    this.password = bcrypt.hashSync(this.password , 10);

    next();
});


//exporting the model so that it can be accessed by the different routes
module.exports = mongoose.model('Administrator', AdministratorSchema);