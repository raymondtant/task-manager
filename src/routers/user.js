const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')
const multer = require('multer')
const avatar = multer({
   // dest: 'avatar',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {

        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return cb(new Error('File must be a valid image file.'))
        }
        cb(undefined, true)

    }
})


router.post('/users', async (req,res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user: user ,token})
    } catch (error) {
        res.status(400).send()
    }
})


router.post('/users/logout', auth, async (req, res) => {
    try {
        
        //iterates until when not equal
        req.user.tokens = req.user.tokens.filter(( token )=>{
            
            
            return token.token !== req.token

        })
        console.log('Logged off')
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        

        req.user.tokens = []
        console.log('Logged out of ALL')
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})


router.get('/users/me', auth,  async (req,res) => {
    // try {
    //     const users = await User.find({})
    //     res.send(users)
    // } catch (error) {
    //     res.status(500).send()
    // }
    res.send(req.user)

})
//Old Code Block not needed anymore
//#region 
// router.get('/users/:id', async (req,res) => {
//     const _id = req.params.id
//     if (!mongoose.Types.ObjectId.isValid(req.params.id)){
//         return res.status(400).send({error: 'Invalid ID!'})
//       }
//       try {
//             const user = await User.findById(_id)
//             if(!user) {
//                 return res.status(404).send()
//             }
//             res.status(200).send(user)
//       } catch (error) {
//             res.status(500).send(error)
//       }
// })
//#endregion


router.patch('/users/me', auth, async (req,res) => {
    //const _id = req.user._id
    //check for proper fields to update
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((item) => {
        return allowedUpdates.includes(item)
    })
    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try {
        
        // const user = await User.findById(_id)
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
        
        await req.user.save()

       
        // if (!user) { 
        //     return res.status(404).send()
        // }
        res.send(req.user)
    } catch (error) {
        
        res.status(400).send(error)
    }
})

router.delete('/users/me', auth, async (req,res) => {
    const _id = req.user._id
    try {
        // const user = await User.findByIdAndDelete(_id)
        // if(!user) {
        //     return res.status(404).send()
        // }
        console.log('Remove /users/me ' + _id)
        console.log('delete /users/me ' + req.user)
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.post('/users/me/avatar', auth,  avatar.single('avatar'), async (req,res) => {
    req.user.avatar = req.file.buffer
    await req.user.save()
    res.send()


}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

// delete avatar image from document
router.delete('/users/me/avatar',auth, async (req,res) => {
   req.user.avatar = undefined
   await req.user.save()
   res.send()
})

//GET image
router.get('/users/:id/avatar',auth, async (req, res) => {
try {
    const user = await User.findById(req.params.id)
    if (!user || !user.avatar) {
        throw new Error()
    }

    res.set('Content-Type','image/jpg')
    res.send(user.avatar)

} catch (error) {
    res.status(404).send()
}
})


module.exports = router