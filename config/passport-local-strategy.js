const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email , password , done){
        //find the user and establish the identity
        User.findOne({
            email : email
        },
        function(err , user){
            if(err){
                console.log('error in finding the user --> passport');
                return done(err);
            }
            if(!user || password != user.password){
                console.log('Invalid Username / Password');
                return done(null , false);
            }
            return done(null , user);
        });
    }
));

//serializing the user to decide which key is to be kept in the cookies
//it means .....server is creating a cookie corresponding the user in the db ,,,asked by the browser
passport.serializeUser(function(user , done){
    done(null , user.id);
});

// deserializing the user from the key in the cookies
//it means... browser has asked data corresponding to that cookie by the server
passport.deserializeUser(function(id , done){
    User.findById(id , function(err , user){
        if(err){
            console.log('error in finding the user while deserializing --> passport');
            return done(err);
        }
        return done(null , user);
    });
});

//check if the user is authenticated
passport.checkAuthentication = function(req , res , next){
    if(req.isAuthenticated()){
        return next;
    }
    // if the user is not signed-in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req , res , next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending
        // this to the locals for the view.
        res.locals.user = req.user;
    }
    next();
}