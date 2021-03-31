const app = require('./app')

// const express = require('express')
// const mongoose = require('mongoose')
// require('./db/mongoose')
// const userRouter = require('./routers/user')
// const taskRouter = require('./routers/task')

// const app  = express()
 const port = process.env.PORT 


// app.use((req, res, next ) => {
//     if(req.method === "GET") {
//         res.send('GET disabled')
//     } else {
//         next()
//     }
// })

// const maintenanceMode = false
// app.use((req, res, next) => {
//     if(maintenanceMode) {
//         res.status(503).send("Maintenance Mode!")
//     } else { next() }
// }) 
 


// app.use(express.json())
// app.use(userRouter)
// app.use(taskRouter)




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

const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {

        // cb(new Error('file must be a PDF'))
        // cb(undefinded, true)
        // cb (undefined, fasle)

        if(!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('file must be a word doc'))
        }
        cb(undefined, true)

    }
})

const errorMiddleware = (res, req, next) => {
    throw new Error('From my middleware')
}

app.post('/upload', upload.single('upload') , (req, res) => {
    
    res.send()

}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})



//wacky shorthand
const mymatch = {}
const fakevar = {completed:'false'}

mymatch.completed = fakevar.completed === 'true'

console.log(fakevar)
console.log(mymatch)

//uploads

