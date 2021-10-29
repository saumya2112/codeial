const express = require('express');
const port = 8000;
const app = express();

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

app.use(express.static('./assets'));

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);

app.use('/' , require('./routes/index'));

app.set('view engine' , 'ejs');
app.set('views' , './views');

app.listen(port , function(err){
    if(err){
        console.log(`error in creating the server : ${err}`);
    }
    console.log(`server is up and running on port : ${port}`);
});