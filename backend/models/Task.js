const {Schema, model} = require('mongoose');

const Task = new Schema({
    taskName: {type: String},
    status: {
        type: String,
        required: true
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    renderIndex: {type: Number},
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

