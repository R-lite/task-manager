const asyncWrapper = require('../middleware/async');
const Task = require('./../models/Task');
const { createCustomError } = require('./../errors/custom-error');

const getAllTask = asyncWrapper( async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({ tasks })
})

const createTask = asyncWrapper( async (req, res) => {
    const task = await Task.create(req.body);
    res.status(200).json({ task });
})

const getTask = asyncWrapper( async (req, res) => {
    const {id:taskId} = req.params;
    const task = await Task.findOne({ _id: taskId });

    if (!task) {
        return next(createCustomError(`No such task with Id: ${taskId}`, 404))
    }

    res.status(200).json({ task })
})

const updateTask = asyncWrapper( async (req, res) => {
    const { id:taskId } = req.params;
    const task = await Task.findOneAndUpdate({ _id:taskId }, req.body, {
        new: true,
        runValidators: true
        }
    );

    if (!task) {
        return next(createCustomError(`No such task with Id: ${taskId}`, 404))
    }

    res.status(200).json({ task })
})

const deleteTask = asyncWrapper( async (req, res) => {
    const { id:taskId } = req.params;
    const task = await Task.findOneAndDelete({ _id:taskId });

    if (!task) {
        return next(createCustomError(`No such task with Id: ${taskId}`, 404))
    }

    res.status(200).send()
})

module.exports = {
    getAllTask,
    createTask,
    getTask,
    updateTask,
    deleteTask
}