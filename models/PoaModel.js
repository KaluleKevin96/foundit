//this shall have the code that will interact with the database regarding Points of Access

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const passportLocalMongoose = require('passport-local-mongoose');

const PoaSchema = mongoose.Schema({
    poa_id:{
        type:String,
        unique: true,
        required: [true , "Generate unique secondary Id"]
    },
    poa_name:{
        type:String,
        unique: true,
        required: [true , "Please Enter The Name of The Point Of Access"]
    },
    location:{
        type:String,
        required: [true , "Please Enter The Location of The Point Of Access"]
    },
    POA_email:{
        type:String,
       
    },
    POA_contact:{
        type:String,
        unique: [true, "This contact has been registered for another Point Of Access"],
        required: [true , "Please Enter The Phone Contact of The Point Of Access"]
    },
    person_in_charge:{
        type:String,
        required: [true , "Please Enter The Name of Person in charge at The Point Of Access"]
    },
    username:{
        type:String,
        unique: [true, "This username has been registered for another Point Of Access"],
        required: [true , "Please Enter The Username for The Point Of Access"]
    },
    password:{
        type:String,
        required: [true , "Please Enter A Password for The Point Of Access"]
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
PoaSchema.pre('save' , function(next) {

    this.password = bcrypt.hashSync(this.password , 10);

    next();
});

    //authenticate input against database
    PoaSchema.statics.authenticate = async function (username, password) {
        const poa = await this.findOne({ username: username })
        if (!poa) {
            throw new Error('Point Of Access not found.');
        }
        const match = await bcrypt.compare(password, poa.password)

        if (match) {
           
            return poa;
        }else{

            throw new Error('Log In Failed.');
        }
    }

// PoaSchema.plugin(passportLocalMongoose);

//exporting the model so that it can be accessed by the different routes
module.exports = mongoose.model('Poa', PoaSchema);