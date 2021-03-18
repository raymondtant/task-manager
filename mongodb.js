// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const {MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'



MongoClient.connect(connectionURL,{ useNewUrlParser: true }, (error, client) => {

    if (error) {
        return console.log('Unable to connect to the DB.')
    }

   const db = client.db(databaseName)


//     db.collection('users').updateOne({
//        _id: new ObjectID("604ed996c96e8d4b00d22db2")
//    },{
//        $inc: { age: 1 }
//    }).then((result) => {
//     console.log(result)
//    }).catch ((error) => {
//     console.log(error)
//    })

db.collection('tasks').updateMany({
    completed: false
}, {
    $set: {
        completed: true
    }
}).then((result) => {
        console.log(result)
       }).catch ((error) => {
        console.log(error)
       })


db.collection('users').deleteMany({
     age: 27
}).then((result) => {
    console.log(result)
   }).catch ((error) => {
    console.log(error)
   })       


    db.collection('tasks')
        .deleteOne({ description: "brush teeth" })
        .then((result) => { console.log(result) })
        .catch((error) => { console.log(error) })



    // db.collection('users').findOne({ _id: new ObjectID("604e53f950a94418d48c0f38") }, (error, user) => {
    //     if (error) {
    //         return console.log("unable to find...")
    //     }

    //     console.log(user)

    // })


// db.collection('users').find({ age: 51 }).toArray((error, users) => {
//         console.log(users)
// })

// db.collection('users').find({ age: 51 }).count((error, count) => {
//     console.log(count)
// })


//db.collection('tasks').findOne({ })

//   db.collection('tasks').findOne({ _id: new ObjectID("604f3d749a68cd30a4fbb733") }, (error, task) => {
//         if (error) {
//             return console.log("unable to find...")
//         }

//         console.log(task)

//     })



// db.collection('tasks').find({}).count((error, count) => {
//     console.log(count)
// })



// db.collection('tasks').find({ completed: false }).toArray((error, array) => {
//     console.log(array)
// })


 })