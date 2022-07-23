const mongoose= require('mongoose');

//to make a connection
mongoose.connect('mongodb://localhost/codeial_development');

const db= mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to MongoDB"));
db.once('open',function(){
    console.log('Connected to Database::MongoDB');
});
module.exports=db;