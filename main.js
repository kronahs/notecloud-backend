const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Note = require('./models/noteModel');

const userRoutes = require('./routes/user_routes');
const noteRoutes = require('./routes/note_routes');

const app = express();

app.use(cors());
app.use(bodyParser.json())

app.use('/users', userRoutes);
app.use('/notes', noteRoutes);

const connectionString = process.env.MONGODB_URI;

app.get('/', (req,res) =>{
    res.send('Welcome to NoteCloud')
});


mongoose.connect(connectionString)
    .then(() => {
        console.log("Connected to MongoDb");
        app.listen("5000", () => {
            console.log("Connected to port 5000");
        })
    }) .catch((err) => {
        console.error(err);
    })


