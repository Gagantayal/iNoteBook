const mongoose = require("mongoose")
strictPopulate=false
const UserTask = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:"general"   
    },
    date:{
        type:Date,
        default:Date.now
    }
    })

const usermodel = mongoose.model('TASK',UserTask);
module.exports = usermodel;