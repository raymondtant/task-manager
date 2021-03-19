require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('60534eab704a90201c382b77').then((task) => {
//         console.log("first log: " + task)
//         return Task.countDocuments({completed: false})
// }).then((result) => {
//     console.log("result: " + result)
// }).catch((e) => {
//     console.log("error: " +e)
// })

const deleteTaskAndCount = async (id) => {

    const deleteTask = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})
    return count

}

deleteTaskAndCount('6053d2ad3b062ae9f40bae0c').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})



// findByIdAndUpdate('', {}).then((user) => {
//     console.log(user)
//     return User.countDocuments({age: 1})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })