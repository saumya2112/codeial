const User = require('../models/user');

module.exports.profile = function(req , res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id , function(err , user){
            if(user){
                return res.render('users_profile' , {
                    title : 'User Profile',
                    user : user
                });
            }
            else{
                return res.redirect('/users/sign-in');
            }
        });
    }
    else{
        return res.redirect('/users/sign-in');
    }
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
// get the signUp data
module.exports.create = function(req , res){
    //handle password and confirm password
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    //find the user
    User.findOne({
        email: req.body.email
    }, function(err , user){
        console.log('###########');
        console.log(user);
        if(err){
            console.log('error in finding user in signing up');
            return;
        }
        //handle user not found
        if(!user){
            User.create(req.body , function(err , user){
                if(err){
                    console.log('error in creating user while signing up');
                    return;
                }
                return res.redirect('/users/sign-in');
            });
        }
        //handle user found
        else{
            return res.redirect('back');
        }
    });
}
//signIn and create the session for the user
//steps to authenticate
module.exports.createSession = function(req , res){
    //find the user
    User.findOne({
        email: req.body.email
    }, function(err , user){
        if(err){
            console.log('error in finding user while signing in');
        }
        //handle user found
        if(user){
            //handle password which doesn't match
            if(user.password != req.body.password){
                return res.redirect('back');
            }
            //handle session creation
            res.cookie('user_id' , user.id);
            return res.redirect('/users/profile');
        }
        //handle user not found
        else{
            return res.redirect('back');
        }
    });    
}
module.exports.deleteSession = function(req , res){
    User.findByIdAndDelete(req.cookies.user_id , function(err , user){
        
    });    
}
