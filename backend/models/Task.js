const {Schema, model} = require('mongoose');

const Task = new Schema({
    taskName: {type: String},
    flag: {
        type: String,
        required: true
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    description: {type: String},
    subTasks: [{
        _id: {
            type: String,
            required: true
        },
        todo: {
            type: String,
        },
        isDone: {
            type: Boolean,
            required: true
        }
    }]
})

module.exports = model('Task', Task);

