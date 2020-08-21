const router = require('../routes');

module.exports = (app) => {
  app.use('/home', router.home);

   app.use('/users', router.users);

   app.use('/plays', router.plays);

    
    
};