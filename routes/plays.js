const router = require('express').Router();
const handler = require('../handlers/plays');
const isAuth = require('../utils/isAuth');
const validations = require('../utils/validator')


router.get('/create-plays',  isAuth(), handler.get.createPlays)
router.get('/details-plays/:id', isAuth(), handler.get.detailsPlays)
router.get('/edit-plays/:id', isAuth(), handler.get.editPlays)
router.get('/delete-plays/:id', isAuth(), handler.get.deletePlays)



router.post('/create-plays', isAuth(),  handler.post.createPlays)
router.post('/edit-plays/:id', isAuth(), handler.post.editPlays)



module.exports = router;
