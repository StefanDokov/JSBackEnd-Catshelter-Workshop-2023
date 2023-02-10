const mongoose = require('mongoose');


const catSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Name is required!"]
    },
    description: {
        type: String,
        required: [true,"Descripton is required!"]
    },
    imageUrl: {
            type: String,
            required: true,
    },
    breed: {
        type: String,
        required: true,
      }
});


const Cat = mongoose.model('Cat', catSchema);

module.exports = Cat;
