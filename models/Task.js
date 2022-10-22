const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlenght: [25, 'Task cannot be more than 25 char long'],
        required: [true, 'This field is required'],
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Task', TaskSchema);