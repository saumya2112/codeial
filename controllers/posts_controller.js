module.exports.posts = function(req , res){
    // return res.end('<h1>Users Posts<h1>');
    return res.render('posts' , {
        title : 'users-posts'
    });
}