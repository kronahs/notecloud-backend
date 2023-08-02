const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/userModel');

const router = express.Router();


router.get("/", async (req,res) => {
    try {
        const user = await User.find({});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})



//Create Note
router.post("/", async (req,res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


//Update Note
router.put("/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id);
        if(!user){
            res.status(404).json({mesage: `Cannot find note with ID ${id}`});
        }
        const UpdatedUser = await User.findById(id);
        res.status(200).json(UpdatedUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})



//Delete Note
app.delete("/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id)

        if(!user){
            return res.status(404).json({message: `Cannot find note with ID:${id}`});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

module.exports = router;