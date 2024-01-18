const {Schema, model} = require ('mongoose');

const Project = new Schema({
    text: {type: String},
    user: {type: Schema.Types.ObjectId, required: true},
    // projectList: [{type: Project, ref: 'Project'}]
})

module.exports = model('Project', Project);
