module.exports.profile = function(req , res){
    // return res.end('<h1>users profile</h1>');
    return res.render('users_profile' , {
        title : 'users_profile'
    });
}