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
const {up} = require("yarn/lib/cli");

router.post('/createProject',
    authMiddleware,
    async (req, res) => {
        try {
            const {title, taskList} = req.body;

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

router.patch('/updateTask/:projectId',
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

router.patch('/swapTasks/:projectId', authMiddleware, async (req, res) => {
    const projectId = req.params.projectId;

    try {
        // const project = await Project.findById(projectId);
        // if (!project) {
        //     return res.status(404).json({error: 'Проект не найден'});
        // }

        // Extract the updated task list from req.body
        const {taskList, projectId} = req.body;


        // Iterate through the taskList and update each task
        for (const updatedTask of taskList) {
            console.log(updatedTask._id)
            await Task.findByIdAndUpdate(updatedTask._id, updatedTask, {new: true});
            console.log(updatedTask)
        }


        // Fetch all tasks for the project after the update
        const allTasks = await Task.find({projectId});
        console.log(allTasks)

        res.json({taskList: allTasks, projectId});
    } catch (e) {
        console.error(e);
        res.status(500).json({error: 'Внутренняя ошибка сервера'});
    }
});

// router.patch('/swapTasks/:projectId',
//     authMiddleware,
//     async (req, res) => {
//         const projectId = req.params.projectId;
//         // {projectId
//         // ActiveTAsk
//         // ovevrTask}
//
//         try {
//             const project = await Project.findById(projectId);
//             if (!project) {
//                 return res.status(404).json({error: 'Проект не найден'});
//             }
//             console.log(req.body)
//
//             await Task.updateMany({
//                 projectId: req.body.projectId
//             }, req.body.taskList)
//
//             // await Task.updateOne({
//             //     _id: req.body.activeTask._id
//             // }, {
//             //     ...activeTask,
//             // });
//             // await Task.updateOne({
//             //     _id: req.body.overTask._id
//             // }, {
//             //     ...overTask,
//             // });
//
//
//             // Проверяем, является ли tasksToUpdate объектом
//             // if (activeTask && overTask) {
//             //     await Task.findOneAndUpdate({_id: activeTask._id}, activeTask, {new: true});
//             //     await Task.findOneAndUpdate({_id: overTask._id}, overTask, {new: true});
//             // }
//
//             // Преобразуем вложенные объекты в массив и обрабатываем каждый объект
//             // await Task.findOneAndUpdate({_id: activeTask._id}, activeTask, {new: true});
//             // await Task.findOneAndUpdate({_id: overTask._id}, overTask, {new: true});
//
//
//             const allTasks = await Task.find({projectId: projectId});
//             console.log(allTasks)
//             res.json({taskList: allTasks, projectId: projectId});
//         } catch (e) {
//             console.error(e);
//             res.status(500).json({error: 'Внутренняя ошибка сервера'});
//         }
//     });


router.patch('/updateProject/:projectId',
    authMiddleware,
    async (req, res) => {
        const projectId = req.params.projectId;

        try {
            const updatedProject = await Project.findOneAndUpdate({_id: projectId}, req.body);
            if (!updatedProject) {
                return res.status(404).json({error: 'Проект не найден'});
            }
            // const updatedTask = await Task.findOneAndUpdate({_id: req.body._id}, req.body, {
            //     new: true
            // });
            res.json(updatedProject);
        } catch (e) {
            console.error(e);
            res.status(500).json({error: 'Внутренняя ошибка сервера'});
        }
    });


router.get('/getTasks/:projectId',
    authMiddleware,
    async (req, res) => {
        const projectId = req.params.projectId;
        try {
            Task.find({projectId: projectId}).then((tasks) => {
                if (!tasks) {
                    return res.status(400).json({message: 'No projects'})
                }
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

        res.json(taskId);

    } catch (e) {
        console.error(e);
        res.status(500).send({message: 'Server error'});
    }
});
router.delete('/deleteProject/:projectId', authMiddleware,
    async (req, res) => {
        const projectId = req.params.projectId;

        try {
            await Project.findOneAndDelete({_id: projectId});
            await Task.deleteMany({projectId: projectId});
            res.json(projectId);

        } catch (e) {
            console.error(e);
            res.status(500).send({message: 'Server error'});
        }
    });


module.exports = router;
