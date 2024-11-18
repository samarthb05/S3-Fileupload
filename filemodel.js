const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    photo: {
        type: String, 
        required: true 
    }
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
