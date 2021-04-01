const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')

const {userOne, userOneId, setupDatabase} = require('./fixtures/db')



beforeEach( async () => {
    //console.log('beforeEach')
await setupDatabase()
  
})


test('Should create a task for user', async () => {

    const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        description: "This is a test suite entry"
    }).expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toBe(false)

})

test('Should get tasks for user', async () => {

    const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send().expect(200)

    // const task = await Task.findById(response.body._id)
    // expect(task).not.toBeNull()
    // expect(task.completed).toBe(false)
    expect(response.body.length).toBe(2)

})

