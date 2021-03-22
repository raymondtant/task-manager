const express = require('express')
const mongoose = require('mongoose')
const auth = require('../middleware/auth')
const Task = require('../models/task')
const { findOne } = require('../models/user')
const User = require('../models/user')
const router = new express.Router()

router.post('/tasks', auth , async (req,res) => {
    //const task = new Task(req.body)
    const task = new Task({
        ...req.body, 
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

 router.get('/tasks', auth, async (req,res) => {
    
    try {
       // console.log(req.user._id)
      
     // const tasks = await Task.find({ owner: req.user._id})
     await req.user.populate('tasks').execPopulate()
     //await user.populate('tasks').execPopulate()
      
       res.send( req.user.tasks )
    } catch (error) {
        res.status(500).send("error")
    }
    
})

router.get('/tasks/:id', auth, async (req,res) => {
    const _id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).send({error: 'Invalid task ID!'})
      }
    
    try {
        //const task = await Task.findById(_id)

        const task = await Task.findOne({
            _id,
            owner: req.user._id
        })

        if(!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/tasks/:id', auth,async (req,res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((item) => {
        return allowedUpdates.includes(item)
    })
    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid TASK updates!'})
    }
    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})
       //const task = await Task.findById(_id)
       //const task = await Task.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
        if (!task) { 
            return res.status(404).send()
        }
        updates.forEach((update) => {
                    task[update] = req.body[update]
                })
        await task.save()        
        res.send(task)
    } catch (error) {
        
        res.status(400).send(error)
    }   
})

router.delete('/tasks/:id',auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOneAndDelete({_id, owner: req.user._id} )
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router