//as it is an object
module.exports.home= function(req,res){
    console.log(req.cookies);
    res.cookie('user_id',36);
    return res.render('home',{
        title:"Home"
    });
}

//module.exports.actionName= functione(req,res){}