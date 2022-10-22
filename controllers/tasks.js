const Task = require('./../models/Task');

const getAllTask = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({ tasks })

    } catch (err) {
        res.status(404).json({ msg: err})
    }
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(200).json({ task });

    } catch (err) {
        res.status(400).json({ msg: err })
    }
    
}

const getTask = async (req, res) => {
    try {
        const {id:taskId} = req.params;
        const task = await Task.findOne({ _id: taskId });

        if (!task) {
            return res.status(404).json({ msg: `No such task with Id: ${taskId}` })
        }

        res.status(200).json({ task })

    } catch (err) {
        res.status(404).json({ "msg": err })
    }
}

const updateTask = async (req, res) => {
    try {
        const { id:taskId } = req.params;
        const { name:newName, completed:isCompleted } = req.body;
        const task = await Task.updateOne({ _id:taskId }, { name:newName, completed:isCompleted });

        if (!task) {
            return res.status(404).json({ msg: `No such task with Id: ${taskId}` })
        }

        res.status(200).json({ task })

    } catch (err) {
        res.status(400).json({ "msg": err })
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id:taskId } = req.params;
        const task = await Task.findOneAndDelete({ _id:taskId });

        if (!task) {
            return res.status(404).json({ msg: `No such task with Id: ${taskId}` })
        }

        res.status(200).send()
        
    } catch (err) {
        res.status(400).json({ "msg": err })
    }
}

module.exports = {
    getAllTask,
    createTask,
    getTask,
    updateTask,
    deleteTask
}