const Router = require('express');
const User = require('../models/User');
const config = require('config');
const router = new Router;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Project = require('../models/Project')
const Task = require('../models/Task')
const authMiddleware = require('../middleware/auth.middleware');
const {json} = require("express");

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
        const {task} = req.body;
        console.log("request", task);

        try {
            const project = await Project.findById(projectId);
            if (!project) {
                return res.status(404).json({error: 'Проект не найден'});
            }

            let existingTask = await Task.findOne({_id: task._id});

            if (!existingTask) {
                // Задача не найдена в базе данных, создаем новую задачу и добавляем ее в массив задач проекта
                const newTask = new Task({
                    ...task,
                    projectId: projectId
                });
                await newTask.save();
                project.taskList.push(newTask._id);
                await project.save();
                return res.json(project);
            } else {
                // Задача уже существует в базе данных, проверяем, есть ли она в массиве задач проекта
                if (!project.taskList.includes(existingTask._id)) {
                    project.taskList.push(existingTask._id);
                    await project.save();
                }
                return res.json(project);
            }

        } catch (e) {
            console.error(e);
            res.status(500).json({error: 'Внутренняя ошибка сервера'});
        }
    });


router.patch('/updateProject/:projectId',
    authMiddleware,
    async (req, res) => {
        const projectId = req.params.projectId;


        try {
            const project = await Project.findById(projectId);
            if (!project) {
                return res.status(404).json({error: 'Проект не найден'});
            }
            const updatedTask = await Task.findOneAndUpdate({_id: req.body._id}, req.body, {
                new: true
            });
            res.json(updatedTask);
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

router.delete('/deleteTask/:projectId/:taskId', authMiddleware, async (req, res) => {
    const projectId = req.params.projectId;
    const taskId = req.params.taskId;

    try {
        // Удаление задачи
        await Task.findOneAndDelete({_id: taskId});

        // Найти проект по идентификатору
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({message: 'Project not found'});
        }

        // Удалить удаленную задачу из списка задач проекта
        project.taskList = project.taskList.filter(task => task.toString() !== taskId);
        await project.save();

        res.json(project);

    } catch (e) {
        console.error(e);
        res.status(500).send({message: 'Server error'});
    }
});


module.exports = router;
