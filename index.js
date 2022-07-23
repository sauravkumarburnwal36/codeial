//To require express
const express= require('express');

//to require cookie-parser library->to create and update the cookies
const cookieParser= require('cookie-parser');

//To acquire the functionalities of express libraries
const app= express();
//To define the port to run the server
const port= 8000;

//to require layout library
const expressLayouts=require('express-ejs-layouts');
const db= require('./config/mongoose');

//used for session cookies
const session= require('express-session');
const passport= require('passport');
const passportLocal= require('./config/passport-local-strategy');
const MongoStore= require('connect-mongo')(session);
//require scss
const sassMiddleware= require('node-sass-middleware');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'expanded',
    prefix:'/css'
}));
//to read through post requests
app.use(express.urlencoded());
//to setup cookieparser library
app.use(cookieParser());
//to use static files
app.use(express.static('./assets'));
app.use(expressLayouts);
//extract styles and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//setup the view engine
app.set('view engine','ejs');
app.set('views','./views'); 

app.use(session({
    name:'codeial',
    //TODO change the secret before deployment in production mode
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },//mongo store is used to store the session cookie in the db
    store: new MongoStore(
        {
            mongooseConnection:db,
            autoRemove:'disabled'
        },
        function(err){
            console.log(err||'connect mongodb setup ok');
        }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

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