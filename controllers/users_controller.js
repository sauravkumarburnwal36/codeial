//to require users schema
const User= require('../models/user');
module.exports.profile= function(req,res){
   return res.render('user_profile',{
    title:'User Profile'
   });
};

//render sign in page
module.exports.signIn= function(req,res){
   if(req.isAuthenticated()){
      return res.redirect('/users/profile');
   }
   return res.render('user_sign_in',{
      title:"Codeial|Sign In"
   });
};

//render sign up page
module.exports.signUp= function(req,res){
   if(req.isAuthenticated()){
      return res.redirect('/users/profile');
   }
   return res.render('user_sign_up',{
      title:"Codeial|Sign Up"
   });
};





//get sign up data
module.exports.create= function(req,res){
   //to check if password and confirm password are same or not
   if(req.body.password!=req.body.confirm_password){
      return res.redirect('back');
   }
   User.findOne({email:req.body.email},function(err,user){
      if(err){
         console.log('error in finding user in signing up');
         return;
      }
      //if user is not found
      if(!user){
         User.create(req.body,function(err,user){
            if(err){
               console.log('error in creating user while signing up');
               return;
            }
            return res.redirect('/users/sign-in');
         })
      }else{
         return res.redirect('back');
      }
   });
};

//sign in and create session for the user
module.exports.createSession= function(req,res){
   //TODO Later
   return res.redirect('/');
   return res.redirect('/');
};
module.exports.destroySession = function (req, res) {
   req.logout(function (err) {
     if (err) {
       console.log("error in logout", err);
       return;
     }
     return res.redirect("/");
   });
 };