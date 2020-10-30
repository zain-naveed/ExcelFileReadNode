const mongoose = require('mongoose');
const titleSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    }
});
module.exports = mongoose.model('title',titleSchema);