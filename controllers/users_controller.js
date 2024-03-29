//to require users schema
const User= require('../models/user');
module.exports.profile= function(req,res){
   User.findById(req.params.id,function(err,users){
      return res.render('user_profile',{
         title:'User Profile',
        profile_user: users
   });
});
   
};

//update the profile
module.exports.update= function(req,res){
   if(req.user.id == req.params.id){
      User.findByIdAndUpdate(req.params.id,req.body,function(err,users){
         req.flash('success','Updated!!!');
         return res.redirect('back');
      });
   }else{
      req.flash('error','Unauthorized!!!');
      return res.status(401).send('Unauthorized');
   }
}

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
      req.flash('error','Password do not match');
      return res.redirect('back');
   }
   User.findOne({email:req.body.email},function(err,user){
      if(err){
         req.flash('error',err);
         return;
      }
      //if user is not found
      if(!user){
         User.create(req.body,function(err,user){
            if(err){
               req.flash('error',err);
               return;
            }
            return res.redirect('/users/sign-in');
         })
      }else{
         req.flash('success',"You have signed up,log in to continue!!!");
         return res.redirect('back');
      }
   });
};

//sign in and create session for the user
module.exports.createSession= function(req,res){
   //TODO Later
   req.flash('success',"Logged In Successfully");
   return res.redirect('/');
};
module.exports.destroySession = function (req, res) {
   req.logout(function (err) {
   req.flash('success',"You have logged out!");
     if (err) {
       req.flash('error',err);
       return;
     }
     return res.redirect("/");
   });
 };