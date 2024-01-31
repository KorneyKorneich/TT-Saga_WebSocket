// const Router = require('express');
// const User = require('../models/User');
// const config = require('config');
// const router = new Router;
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const Project = require('../models/Project')
// const authMiddleware = require('../middleware/auth.middleware');
//
// router.post('/createTasks',
//     authMiddleware,
//     async (req, res) => {
//         try {
//             const {userId, title, taskList} = req.body;
//             console.log(taskList)
//             const project = new Ta({
//                 title: title,
//                 user: req.user.id,
//                 taskList: taskList
//             });
//             console.log(project)
//             await project.save();
//             return res.json({
//                 user: project.user,
//                 title: project.text,
//                 taskList: project.taskList
//             });
//         } catch (e) {
//             return res.status(400).json({message: "something went wrong with creation"})
//         }
//     })
//
// router.post('/getTasks',
//     authMiddleware,
//     async  (req, res) => {
//         try{
//             Project.find({user: req.user.id}).then((projects) => {
//                 if(!projects){
//                     return res.status(400).json({message: 'No projects'})
//                 }
//                 res.json(projects)
//             });
//
//         } catch (e) {
//             console.error(e);
//             res.send({message: 'Server error'})
//         }
//     })
//
//
//
//
// module.exports = router;
