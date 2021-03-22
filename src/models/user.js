const mongoose = require('mongoose')
const bcrypt  = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be apositive number.')
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)){
                throw new Error('Email is invalid.')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Do not use "password" as password.')
            }
            if(!validator.isStrongPassword(value,
                {minLength: 6, 
                minLowercase: 0,
                minUppercase: 0, 
                minNumbers: 0, 
                minSymbols: 1, 
                returnScore: false, 
                })) {
                throw new Error('Complexity issues!!!')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.virtual('tasks',{
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})


//instance methods
// toJSON??  overides because
userSchema.methods.toJSON = function () {
    const user = this
    const userObject  = user.toObject()
//convert to object to manipulate what is on that object
    delete userObject.password
    delete userObject.tokens

    return userObject
}


userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()},'thisismynewcourse')

    user.tokens = user.tokens.concat({token: token})
    await user.save()

    return token
}




//model methods
userSchema.statics.findByCredentials = async (email, password) => {

    const user = await User.findOne({email: email})
    
    if (!user) {
        throw new Error('Unable to login')
    }
    
    const isMatch = await bcrypt.compare(password, user.password)
    
    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}



userSchema.pre('save', async function (next) {
    const user  = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }


    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User