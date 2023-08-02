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
            type: String
        }
    },
    {
        timestamps: true
    }
)

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;