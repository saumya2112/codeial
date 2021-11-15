module.exports.profile = function(req , res){
    // return res.end('<h1>users profile</h1>');
    return res.render('users_profile' , {
        title : 'users_profile'
    });
}
// render the signUp page
 module.exports.signUp = function(req , res){
    res.render('user_sign_up' , {
        title: 'codeial | signUp'
    });
};
// render the signIn page
 module.exports.signIn = function(req , res){
    res.render('user_sign_in' , {
        title: 'codeial | signIn'
    });
};