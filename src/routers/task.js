const express = require('express')
const mongoose = require('mongoose')
const Task = require('../models/task')
const User = require('../models/user')
const router = new express.Router()

router.post('/tasks', async (req,res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send()
    } catch (error) {
        res.status(400).send(error)
    }
})

 router.get('/tasks', async (req,res) => {
    
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.status(500).send()
    }
    
})

router.get('/tasks/:id', async (req,res) => {
    const _id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).send({error: 'Invalid task ID!'})
      }
    
    try {
        const task = await Task.findById(_id)
        if(!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    } catch (error) {
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id', async (req,res) => {
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
        const task = await Task.findById(_id)
        updates.forEach((update) => {
            task[update] = req.body[update]
        })
        
        await task.save()

        //const task = await Task.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
        if (!task) { 
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        
        res.status(400).send(error)
    }   
})

router.delete('/tasks/:id',async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findByIdAndDelete(_id)
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router