const {Schema, model} = require ('mongoose');

const Task = new Schema({
    taskName: {type: String},
    flag: {String},
    projectId: {type: Schema.Types.ObjectId, ref: 'Project', required: true},
    description: {type: String},
    subTasks: [{type: String}]
})

module.exports = model('Task', Task);

