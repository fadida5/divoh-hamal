const mongoose = require('mongoose');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const {ObjectId} = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    personalnumber: {type: String,trim: true,unique:true,require:true},
    role:{type: String,default:"0"},
    validated:{type: Boolean,default:false},
}, {timestamps: true})

module.exports = mongoose.model("User", UserSchema);