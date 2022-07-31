//as it is an objectcl
const { populate } = require('../models/post');
const Post= require('../models/post');
const User= require('../models/user');

// module.exports.home= function(req,res){
//     // console.log(req.cookies);
//     // res.cookie('user_id',36);

//     // The query returns all the posts -->Populate the user of each posts.
//    Post.find({})
//    .populate('user')
//    .populate({
//         path:'comments',
//         populate:{
//             path:'user'
//         }
//    })
//    .exec(function(err,posts){
       
//         User.find({},function(err,users){

//             return res.render('home',{
//                 title:"Codeial|Home",
//                 posts: posts,
//                 all_users: users
//             });

//         });
            
    
//    });
// };

//using async await to reduce callback hell scenarios
module.exports.home= async function(req,res){
    try{
        //populate the users of each post
        let posts= await Post.find({})
                    .populate('user')
                    .populate({
                        path:'comments',
                        populate:{
                            path:'user'
                        }
                    });
        let users= await User.find({});
            
        return res.render('home',{
            title: "Codeial|Home",
            posts: posts,
            all_users: users
        });
    }catch(err){
        console.log('Error',err);
        return;
    }
}





//module.exports.actionName= functione(req,res){}