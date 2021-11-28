const User = require('../models/user');

module.exports.profile = function(req , res){
    // return res.end('<h1>users profile</h1>');
    return res.render('users_profile' , {
        title : 'users_profile'
    });
}
// render the signUp page
 module.exports.signUp = function(req , res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    res.render('user_sign_up' , {
        title: 'codeial | signUp'
    });
};
// render the signIn page
 module.exports.signIn = function(req , res){
     if(req.isAuthenticated()){
         return res.redirect('/users/profile');
     }
    res.render('user_sign_in' , {
        title: 'codeial | signIn'
    });
};
// get the signUp data
module.exports.create = function(req , res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({
        email: req.body.email
    }, function(err , user){
        // console.log('###########');
        // console.log(user);
        if(err){
            console.log('error in finding user in signing up');
            return;
        }
        if(!user){
            User.create(req.body , function(err , user){
                if(err){
                    console.log('error in creating user while signing up');
                    return;
                }
                return res.redirect('/users/sign-in');
            });
        }
        else{
            return res.redirect('back');
        }
    });
}
//signIn and create the session for the user
module.exports.createSession = function(req , res){
    return res.redirect('/');
}

//destroying the session
module.exports.destroySession = function(req , res){
    req.logout();
    return res.redirect('/');
}