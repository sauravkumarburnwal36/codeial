const Comment= require('../models/comment');
const Post= require('../models/post');

module.exports.create= function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            },function(err,comment){
                if(err){
                    console.log('error in posting a comment',err);
                    return;
                }//Update the comments ->save the 
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            });
        }
    });
};

module.exports.destroy= function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(comment.user == req.user.id){

            //fetching the post if from comment
            let postId= comment.post;

            comment.remove();
            //pull out the comment from list of comment
            Post.findByIdAndUpdate(postId,{$pull: {comments:req.params.id}},function(err,post){
                return res.redirect('back');
            });
        }
        else{
            return res.redirect('back');
        }
    });
}