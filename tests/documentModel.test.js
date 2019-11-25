const mongoose = require('mongoose');
const Document = require('../models/DocumentsModel');

describe('Document Model Test' , () => {

    beforeAll( async() =>{

        try {
            //connects to test database
            await mongoose.connect('mongodb://localhost:27017/test-db', { useNewUrlParser: true , useUnifiedTopology: true , useFindAndModify: false }, () => {
                
                console.log("Connected to the database");
            });

            //delete all existing records in the test database
            await Document.deleteMany({});
        }
        catch(err){
            console.log("Database Error "+err);
        }
    })

    it('Should Be Able To save' , async(done) => {

        //TEST DEFINITION GOES HERE

    })


 
 test('should not save when certain input is not given', async () => {
    
    //TEST DEFINITION GOES HERE
       
})
 

 //test tear down: some finishing work that needs to happen after the tests ran
afterEach(async () => {
    try {        
            await Document.deleteMany({})

    } catch (err) {
        console.log("database error " + err)
    }
 } )

   afterAll((done) => {
        
        mongoose.disconnect();
        done();
      });
})