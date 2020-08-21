const Play = require('../plays/Play') 
module.exports = {
    get: {
        home(req, res, next) {

            Play.find().lean().then((plays)=>{

                res.render('home/home.hbs', {
                    
                   isLoggedIn: req.user !== undefined,
                   username: req.user ? req.user.username : '',
                   plays
    
                }
                );
            })

        },

        notFound(req, res, next) {
            res.render('/home/', {
                isLoggedIn: req.user !== undefined,
                username: req.user ? req.user.username : ""
            })
        }
    },
    post: {

    }
}