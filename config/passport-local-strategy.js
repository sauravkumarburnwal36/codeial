const passport= require('passport');

//require the strategy property in passport-local
const LocalStrategy= require('passport-local').Strategy;
const User= require('../models/user');
//authenticate using passport
passport.use(new LocalStrategy({
        usernameField:'email',
        passReqToCallback: true
},
function(req,email,password,done){
    //find a user and establish the identity

    User.findOne({email:email},function(err,user){
        if(err){
            req.flash('error',err);
            return done(err);
        }
        if(!user||user.password != password){
            req.flash('error','Invaild Username/Password');
            return done(null,false);
        }
        return done(null,user);
    });
}
));

//serialize the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
     done(null,user.id);
     
});

//deserialize the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user-->Passport');
            return done(err);
        }
       
        return done(null,user);
    });
});


//checks if the user is autheticated
passport.checkAuthentication= function(req,res,next){
    //If the user is signed in, then pass on the request to the next function at controller's action
    if(req.isAuthenticated()){
        return next();
    }
    //If the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser= function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains current signed in user from session cookies and we are just sending to the locals for the views
        res.locals.user=req.user;
    }
    next();
}
module.exports=passport;