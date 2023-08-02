const mongoose = require('mongoose');

const noteSchema =  mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title Required"]
        },
        description: {
            type: String,
            required: false
        },
        imageUrl: {
            type: String,
            required: false
        },
        category: {
            type: String,
            enum: ['Projects', 'Business', 'Personal'] // Replace with your predefined categories
        }
    },
    {
        timestamps: true
    }
)

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;