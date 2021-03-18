require('../src/db/mongoose')
const User = require('../src/models/user')

//6052af408d0af44690e3111a

User.findByIdAndUpdate('6052b12094aa4f2034b7088f', {age: 1}).then((user) => {
    console.log(user)
    return User.countDocuments({age: 1})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})