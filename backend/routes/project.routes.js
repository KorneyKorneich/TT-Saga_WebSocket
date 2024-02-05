const Router = require('express');
const User = require('../models/User');
const config = require('config');
const router = new Router;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Project = require('../models/Project')
const Task = require('../models/Task')
const authMiddleware = require('../middleware/auth.middleware');

router.post('/createProject',
    authMiddleware,
    async (req, res) => {
        try {
            const {userId, title, taskList} = req.body;

            // Create a new Project instance
            const project = new Project({
                title: title,
                user: req.user.id,
                taskList: taskList
            });

            // Save the project to the database
            await project.save();

            return res.json({
                user: project.user,
                title: project.title,
                taskList: project.taskList
            });
        } catch (e) {
            console.error(e);
            return res.status(400).json({message: "Something went wrong with creation"});
        }
    })

router.post('/getProjects',
    authMiddleware,
    async (req, res) => {
        try {
            Project.find({user: req.user.id}).then((projects) => {
                if (!projects) {
                    return res.status(400).json({message: 'No projects'})
                }
                res.json(projects)
            });

        } catch (e) {
            console.error(e);
            res.send({message: 'Server error'})
        }
    })


router.post('/addTasksToProject/:projectId',
    authMiddleware,
    async (req, res) => {
        const projectId = req.params.projectId;
        const {tasks} = req.body;
        console.log("request", tasks);

        try {
            const project = await Project.findById(projectId);
            if (!project) {
                return res.status(404).json({error: 'Проект не найден'});
            }

            const newTasks = [];
            for (const taskData of tasks) {
                let existingTask = await Task.findOne({_id: taskData._id});

                if (!existingTask) {
                    console.log(taskData, projectId);
                    const newTask = new Task({
                        ...taskData,
                        projectId: projectId
                    });
                    await newTask.save();  // Сохраняем каждую задачу перед добавлением в массив
                    newTasks.push(newTask._id);
                } else {
                    newTasks.push(existingTask._id);
                }
            }

            // Добавляем задачи к проекту
            project.taskList = project.taskList.concat(newTasks);
            await project.save();

            console.log(project);
            res.json(project);

        } catch (e) {
            console.error(e);
            res.status(500).json({error: 'Внутренняя ошибка сервера'});
        }
    });

router.get('/getTasks/:projectId',
    authMiddleware,
    async (req, res) => {
        const projectId = req.params.projectId;
        console.log(projectId)
        try {
            Task.find({projectId: projectId}).then((tasks) => {
                if (!tasks) {
                    return res.status(400).json({message: 'No projects'})
                }
                console.log(tasks);
                res.json(tasks)
            });

        } catch (e) {
            console.error(e);
            res.send({message: 'Server error'})
        }
    })


module.exports = router;
