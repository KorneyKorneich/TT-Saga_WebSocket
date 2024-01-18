const {Schema, model} = require ('mongoose');

const Task = new Schema({
    title: {type: String},
    projectId: {type: Schema.Types.ObjectId, ref: 'Project', required: true},
    taskStatus: {type: String},
    taskDetails: {type: String}
})

module.exports = model('Task', Task);

