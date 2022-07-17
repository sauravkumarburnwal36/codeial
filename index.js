//To require express
const express= require('express');

//To acquire the functionalities of express libraries
const app= express();
//To define the port to run the server
const port= 8000;

//to require layout library
const expressLayouts=require('express-ejs-layouts');
//to use static files
app.use(express.static('./assets'));
app.use(expressLayouts);
//extract styles and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//setup the view engine
app.set('view engine','ejs');
app.set('views','./views');

//use express.router-->middleware
app.use('/',require('./routes'));//by default ./routes/index.js


//What need to be done when server is fired
app.listen(port,function(err){
    if(err){
        //Concatenate the String using interpolation {} is used to embed the string and string is placed inside it
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on the port: ${port}`);
});