require('../src/db/mongoose')
const User = require('../src/models/user')

//6052af408d0af44690e3111a

// User.findByIdAndUpdate('6052b12094aa4f2034b7088f', {age: 1}).then((user) => {
//     console.log(user)
//     return User.countDocuments({age: 1})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })


const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age: age})
    const count = await User.countDocuments({age})
    return count
} 



updateAgeAndCount('6052b12094aa4f2034b7088f',2).then ((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})