//as it is an object
module.exports.home= function(req,res){
    return res.render('home',{
        title:"Home"
    });
}

//module.exports.actionName= functione(req,res){}