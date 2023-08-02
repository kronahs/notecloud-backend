const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Note = require('./models/noteModel');

const app = express();

app.use(cors());
app.use(bodyParser.json())

const connectionString = process.env.MONGODB_URI;

app.get("/", (req,res) => {
    res.send("Welcome to NoteCloud");
})

//Get All Notes
app.get("/notes", async (req,res) => {
    try {
        const notes = await Note.find({});
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})



//Create Note
app.post("/note", async (req,res) => {
    try {
        const note = await Note.create(req.body);
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


//Update Note
app.put("/note/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const note = await Note.findByIdAndUpdate(id);
        if(!note){
            res.status(404).json({mesage: `Cannot find note with ID ${id}`});
        }
        const UpdatedNote = await Note.findById(id);
        res.status(200).json(UpdatedNote);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})


//Delete Note
app.delete("/note/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const note = await Note.findByIdAndDelete(id)

        if(!note){
            return res.status(404).json({message: `Cannot find note with ID:${id}`});
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})




mongoose.connect(connectionString)
    .then(() => {
        console.log("Connected to MongoDb");
        app.listen("5000", () => {
            console.log("Connected to port 5000");
        })
    }) .catch((err) => {
        console.error(err);
    })


