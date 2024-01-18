const {Schema, model} = require ('mongoose');

const Project = new Schema({
    text: {type: String},
    user: {type: Schema.Types.ObjectId, ref: "User", required: true},
    tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}]
})

module.exports = model('Project', Project);
