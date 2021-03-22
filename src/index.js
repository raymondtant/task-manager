const express = require('express')
const mongoose = require('mongoose')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app  = express()
const port = process.env.PORT || 3000

// app.use((req, res, next ) => {
//     if(req.method === "GET") {
//         res.send('GET disabled')
//     } else {
//         next()
//     }
// })

const maintenanceMode = false
app.use((req, res, next) => {
    if(maintenanceMode) {
        res.status(503).send("Maintenance Mode!")
    } else { next() }
}) 



app.use(express.json())
app.use(userRouter)
app.use(taskRouter)




app.listen(port,() => {
    console.log('Server is live at: '+ port)
})



// const jwt = require('jsonwebtoken')

// const myFunction  = async () => {

//     const token = jwt.sign({_id: 'abc123'},'thisismynewcourse', {expiresIn: '10 seconds'})
//     console.log(token)

//     console.log(jwt.verify(token, 'thisismynewcourse'))
// }
 
// myFunction() 

const pet = {
    name: 'cookie'
}

pet.toJSON = function () {
//    console.log(this)
    this.age = 12
    this.animal = "cat"
    delete this.name
    return this
}
console.log(JSON.stringify(pet))



const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
// 60588ef8cab33a2d2c3607a0

// const task = await Task.findById('60588ef8cab33a2d2c3607a0')
// await task.populate('owner').execPopulate()
// console.log(task.owner)

const user = await User.findById('60588b4d9449f620bc21f433')
await user.populate('tasks').execPopulate()
//console.log(user.tasks)
 

}

main()