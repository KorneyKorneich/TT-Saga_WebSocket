const Router = require('express');
const User = require('../models/User');
const config = require('config');
const router = new Router;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Project = require('../models/Project')
const authMiddleware = require('../middleware/auth.middleware');

router.get('/getProjects',
    authMiddleware,
    async  (req, res) => {
        try{
            Project.find({user: req.user.id}).then((projects) => {
                if(!projects){
                    return res.status(400).json({message: 'No projects'})
                }
                res.json(projects)
            });


        } catch (e) {
            console.error(e);
            res.send({message: 'Server error'})
        }
    })




module.exports = router;
