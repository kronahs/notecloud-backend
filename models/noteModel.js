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
        bulletPoints: {
            type: [String],
            default: [],
        },
        category: {
            type: String
        },
        priority: {
            type: String,
            enum: ['high', 'low'],
            default: 'low'
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;