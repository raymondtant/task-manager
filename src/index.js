const express = require('express')
const mongoose = require('mongoose')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app  = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users',(req,res) => {
    const user = new User(req.body)
    console.log(user)
    user.save().then(() => {
        res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.get('/users',(req,res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((e) => {
        res.status(500).send()
    })

})

app.get('/users/:id',(req,res) => {
    const _id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).send({error: 'Invalid ID!'})
      }
    User.findById(_id).then((user) => {
        if(!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    }).catch((e) => {
        res.status(500).send(e)
    })

})


 app.post('/tasks',(req,res) => {
    const task = new Task(req.body)
    console.log(task)    
    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })

 })

 app.get('/tasks',(req,res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks)
    }).catch((e) => {
        res.status(500).send()
    })

})

app.get('/tasks/:id',(req,res) => {
    const _id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).send({error: 'Invalid task ID!'})
      }
    Task.findById(_id).then((task) => {
        if(!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    }).catch((e) => {
        res.status(500).send(e)
    })

})


app.listen(port,() => {
    console.log('Server is live at: '+ port)
})