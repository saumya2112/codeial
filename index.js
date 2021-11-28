const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const { urlencoded } = require('express');

app.use(urlencoded());   //for reading the encrypted cookies

app.use(cookieParser());  //for writing in the cookies 

app.use(express.static('./assets'));

app.use(expressLayouts);

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);

app.set('view engine' , 'ejs');
app.set('views' , './views');

//mongo store is used to store session cookie in the db
app.use(session({
    name: 'codeial',
    secret: 'blahsomething',
    saveUninitialized: 'false',
    resave: 'false',
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use('/' , require('./routes/index'));

app.listen(port , function(err){
    if(err){
        console.log(`error in creating the server : ${err}`);
    }
    console.log(`server is up and running on port : ${port}`);
});