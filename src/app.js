const express = require('express')
const mongoose = require('mongoose')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app  = express()


const maintenanceMode = false
app.use((req, res, next) => {
    if(maintenanceMode) {
        res.status(503).send("Maintenance Mode!")
    } else { next() }
}) 
 


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


module.exports = app

// app.listen(port,() => {
//     console.log('Server is live at: '+ port)
// })



