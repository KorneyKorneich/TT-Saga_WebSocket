const {Schema, model} = require ('mongoose');

const Project = new Schema({
    title: {type: String},
    user: {type: Schema.Types.ObjectId, ref: "User", required: true},
    taskList: [{type: Schema.Types.ObjectId, ref: 'Task'}]
})

module.exports = model('Project', Project);
