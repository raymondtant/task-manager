const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User',{
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
       
    }
})

module.exports = User