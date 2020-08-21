const User = require('../users/User')
const { validationResult } = require('express-validator');
const Play = require('./Play');
const { models } = require('mongoose');

module.exports = {
    get: {
        createPlays(req, res, next) {
            res.render('plays/create-plays.hbs', {


                isLoggedIn: req.user !== undefined,
                username: req.user ? req.user.username : '',

            })
        },
        detailsPlays(req, res, next) {
            const { id } = req.params;

            Play
                .findById(id)
                .populate('usersLiked')
                .lean()
                .then((plays) => {

                    const hbsOptions = Object.keys(plays).reduce((acc, curr) => {
                        acc[curr] = plays[curr]
                        return acc

                    }, {})

                    //console.log(hbsOptions)
                    const currentUser = JSON.stringify(req.user._id)
                    const imAlreadyIn = JSON.stringify(plays.usersLiked).includes(currentUser)
                    res.render('plays/details-plays', {
                        isLoggedIn: req.user !== undefined,
                        username: req.user ? req.user.username : '',
                        imAlreadyIn,
                        ...hbsOptions,
                        isTheCreator: JSON.stringify(req.user._id) === JSON.stringify(plays.creator)

                    });

                })
        },

        editPlays(req, res, next) {
            const { id } = req.params;

            Play.findById(id).then((plays) => {
                const hbsObject = {
                    plays,
                    isLoggedIn: req.user !== undefined
                };

                res.render('plays/edit-plays.hbs', hbsObject);
            })

        },
        deletePlays(req, res, next) {
            const { id } = req.params;

            Play.deleteOne({ _id: id }).lean().then(() => {
                res.redirect('/home/')
            })
        }



    },
    post: {
        createPlays(req, res, next) {

            console.log(req.body)
            const { title, description, imageUrl, isPublic: isChecked } = req.body
            const isPublic = isChecked === 'on' ? true : false
            const createdAt = (new Date() + '').slice(0, 24);
            const creator = req.user._id;

            Play.create({ title, description, imageUrl, isPublic, createdAt, creator })
                .then((createPlay) => {
                    console.log(createPlay);
                    res.status(201).redirect('/home/')
                })


        },
        editPlays: (req, res, next) => {

            const { id } = req.params;
            const { title, description, imageUrl, isPublic } = req.body;
            const isChecked = isPublic === 'on';

            // const errors = validationResult(req);

            // if (!errors.isEmpty()) {
            //     return res.render('createCoursePage.hbs', {
            //         message: errors.array()[0].msg,
            //         oldInput: req.body
            //     })
            // }

            Play.findByIdAndUpdate(id, { title, description, imageUrl, isPublic: isChecked }).lean().then((updatedCourse) => {
                res.redirect('/home/');
            });

        }

    }

}


