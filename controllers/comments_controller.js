const Comment= require('../models/comment');
const Post= require('../models/post');

// module.exports.create= function(req,res){
//     Post.findById(req.body.post,function(err,post){
//         if(post){
//             Comment.create({
//                 content:req.body.content,
//                 post:req.body.post,
//                 user:req.user._id
//             },function(err,comment){
//                 if(err){
//                     console.log('error in posting a comment',err);
//                     return;
//                 }//Update the comments ->save the 
//                 post.comments.push(comment);
//                 post.save();
//                 res.redirect('/');
//             });
//         }
//     });
// };

module.exports.create= async function(req,res){
    try
    {
        let post= await Post.findById(req.body.post);
        if(post){
            let comment= await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
        })
        post.comments.push(comment);
        post.save();
        req.flash('success','Comments Published!!!');
        res.redirect('/');
         }
    }
    catch(err){
        req.flash('error',err);
        return;
    }
    
}


// module.exports.destroy= function(req,res){
//     Comment.findById(req.params.id,function(err,comment){
//         if(comment.user == req.user.id){

//             //fetching the post if from comment
//             let postId= comment.post;

//             comment.remove();
//             //pull out the comment from list of comment
//             Post.findByIdAndUpdate(postId,{$pull: {comments:req.params.id}},function(err,post){
//                 return res.redirect('back');
//             });
//         }
//         else{
//             return res.redirect('back');
//         }
//     });
// }

module.exports.destroy= async function(req,res){
    try
    {
        let comment= await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            //fetching the post if from comment
            let postId= comment.post;
    
            comment.remove();
             //pull out the comment from list of comment
            let post= await Post.findByIdAndUpdate(postId,{$pull:{comments: req.params.id}});
            req.flash('success','Comment Deleted!!!');
            return res.redirect('back');
        }
        else{
            req.flash('error','Unauthorized!');
            return res.redirect('back');
        }
    }
    catch(err){
       req.flash('error',err);
        return res.redirect('back');
    }
   
}