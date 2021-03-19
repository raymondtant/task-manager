const express = require('express')
const mongoose = require('mongoose')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app  = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req,res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/users', async (req,res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send()
    }
})

app.get('/users/:id', async (req,res) => {
    const _id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).send({error: 'Invalid ID!'})
      }

      try {
            const user = await User.findById(_id)
            if(!user) {
                return res.status(404).send()
            }
            res.status(200).send(user)
      } catch (error) {
            res.status(500).send(error)
      }
      
 
})

//tasks-----------------------------------
 app.post('/tasks', async (req,res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send()
    } catch (error) {
        res.status(400).send(error)
    }
})

 app.get('/tasks', async (req,res) => {
    
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.status(500).send()
    }
    
})

app.get('/tasks/:id', async (req,res) => {
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


app.listen(port,() => {
    console.log('Server is live at: '+ port)
})